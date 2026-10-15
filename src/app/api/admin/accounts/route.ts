import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdminSession, hashPassword } from '@/lib/auth/security';
import { CreateAdminSchema } from '@/lib/auth/validation';
import { findUserByEmail, saveUser, PersistentUser } from '@/lib/auth/user-store';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const STORAGE_BUCKET = 'admin-store';
const STORAGE_OBJECT = 'store.json';

const BACKUP_DIR = path.join(process.cwd(), 'data');
const BACKUP_FILE = path.join(BACKUP_DIR, 'admin_backup_store.json');

const DEFAULT_ADMIN_ACCOUNTS = [
  { id: 'ADM-01', name: 'Super Administrator', email: 'superadmin@shreeniwasproperties.com', role: 'Super Admin', level: 'super', status: 'Active' },
  { id: 'ADM-02', name: 'Ananya Sharma', email: 'admin@shreeniwasproperties.com', role: 'Client Query Admin', level: 'staff', status: 'Active' },
];

function readLocalBackup(): Record<string, any> {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Admin Accounts] Error reading backup file:', err);
  }
  return {};
}

function writeLocalBackup(store: Record<string, any>) {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    // Ignore in read-only environments
  }
}

async function readCloudStore(): Promise<Record<string, any>> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return {};
  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${STORAGE_OBJECT}`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object') return json;
    }
  } catch (e) {}
  return {};
}

async function writeCloudStore(store: Record<string, any>): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return false;
  try {
    await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${STORAGE_OBJECT}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'x-upsert': 'true',
      },
      body: JSON.stringify(store),
    });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * GET /api/admin/accounts
 * Fetch active admin accounts list (requires admin session)
 */
export async function GET(request: Request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin session required.' }, { status: 401 });
    }

    const localBackup = readLocalBackup();
    const cloudStore = await readCloudStore();
    const accounts = cloudStore.shreeniwas_admin_accounts || localBackup.shreeniwas_admin_accounts || DEFAULT_ADMIN_ACCOUNTS;

    return NextResponse.json({ success: true, admins: accounts });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch admin accounts' }, { status: 500 });
  }
}

/**
 * POST /api/admin/accounts
 * Create or promote an admin account with custom email and password (Super Admin Only)
 */
export async function POST(request: Request) {
  try {
    const session = await getAdminSession(request);
    if (!session || (session.role !== 'SUPER_ADMIN' && session.level !== 'super')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only Super Administrators can create or configure admin accounts.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parseResult = CreateAdminSchema.safeParse(body);

    if (!parseResult.success) {
      const msg = parseResult.error.errors[0]?.message || 'Invalid admin details';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { name, email, password, role, level } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Hash password with bcrypt
    const hashedPassword = await hashPassword(password);
    const now = new Date().toISOString();

    // 2. Check if user already exists in user_accounts
    const existing = await findUserByEmail(normalizedEmail);
    const adminId = existing?.id || `ADM-${Date.now().toString(36).toUpperCase()}`;

    const adminUser: PersistentUser = {
      id: adminId,
      email: normalizedEmail,
      name: name.trim(),
      phone: existing?.phone || '',
      role: level === 'super' ? 'SUPER_ADMIN' : 'STAFF_ADMIN',
      passwordHash: hashedPassword,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    // Save to user store (file backup + Supabase PostgreSQL user_accounts)
    await saveUser(adminUser);

    // 3. Update shreeniwas_admin_accounts in admin store
    const localBackup = readLocalBackup();
    const cloudStore = await readCloudStore();
    const existingAccounts: any[] = cloudStore.shreeniwas_admin_accounts || localBackup.shreeniwas_admin_accounts || DEFAULT_ADMIN_ACCOUNTS;

    const newAdminRecord = {
      id: adminId,
      name: name.trim(),
      email: normalizedEmail,
      role: role.trim(),
      level: level,
      status: 'Active',
      createdAt: now,
    };

    // Replace if email exists, otherwise prepend
    const updatedAccounts = [
      newAdminRecord,
      ...existingAccounts.filter(a => a.email?.toLowerCase().trim() !== normalizedEmail),
    ];

    const combined = {
      ...localBackup,
      ...cloudStore,
      shreeniwas_admin_accounts: updatedAccounts,
    };

    writeLocalBackup(combined);
    await writeCloudStore(combined);

    // Also persist to PostgreSQL admin_store table if available
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/admin_store`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            key: 'shreeniwas_admin_accounts',
            data: updatedAccounts,
            updated_at: now,
          }),
        });
      } catch (err) {}
    }

    return NextResponse.json({
      success: true,
      message: `Admin account for ${normalizedEmail} created successfully with login credentials.`,
      admin: newAdminRecord,
      accounts: updatedAccounts,
    });

  } catch (error: any) {
    console.error('[Admin Accounts POST] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create admin account' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/accounts
 * Revoke or remove an admin account (Super Admin Only)
 */
export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession(request);
    if (!session || (session.role !== 'SUPER_ADMIN' && session.level !== 'super')) {
      return NextResponse.json(
        { error: 'Unauthorized: Only Super Administrators can remove admin accounts.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const targetEmail = body.email?.toLowerCase().trim();

    if (!targetEmail) {
      return NextResponse.json({ error: 'Missing target email address' }, { status: 400 });
    }

    // Never allow deleting the primary super administrator
    const primaryAdminEmail = (process.env.ADMIN_EMAIL || 'superadmin@shreeniwasproperties.com').toLowerCase();
    if (targetEmail === primaryAdminEmail) {
      return NextResponse.json({ error: 'Cannot remove the primary Super Administrator account.' }, { status: 400 });
    }

    const localBackup = readLocalBackup();
    const cloudStore = await readCloudStore();
    const existingAccounts: any[] = cloudStore.shreeniwas_admin_accounts || localBackup.shreeniwas_admin_accounts || DEFAULT_ADMIN_ACCOUNTS;

    const updatedAccounts = existingAccounts.filter(a => a.email?.toLowerCase().trim() !== targetEmail);

    const combined = {
      ...localBackup,
      ...cloudStore,
      shreeniwas_admin_accounts: updatedAccounts,
    };

    writeLocalBackup(combined);
    await writeCloudStore(combined);

    // Optionally demote user in user_accounts store
    const existing = await findUserByEmail(targetEmail);
    if (existing) {
      existing.role = 'Property Seeker';
      existing.updatedAt = new Date().toISOString();
      await saveUser(existing);
    }

    return NextResponse.json({
      success: true,
      message: `Admin account ${targetEmail} removed successfully.`,
      accounts: updatedAccounts,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to remove admin account' }, { status: 500 });
  }
}
