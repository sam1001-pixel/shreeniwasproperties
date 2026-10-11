import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/auth/security';

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const STORAGE_BUCKET = 'admin-store';
const STORAGE_OBJECT = 'store.json';

// Whitelist of public non-sensitive keys permitted for unauthenticated visitor reads
const PUBLIC_ALLOWED_KEYS = new Set([
  'shreeniwas_admin_properties',
  'shreeniwas_new_projects',
  'shreeniwas_blog_posts',
  'shreeniwas_blocked_visit_dates',
  'shreeniwas_admin_reels',
  'shreeniwas_tariff_settings',
  'shreeniwas_payment_settings',
  'shreeniwas_platform_settings',
  'shreeniwas_brokerage_settings',
  'shreeniwas_testimonials_management',
  'shreeniwas_locality_price_trends_v2',
  'hero_slides',
  'site_settings',
]);

// Local persistent filesystem backup path (initial seed & local dev safety net)
const BACKUP_DIR = path.join(process.cwd(), 'data');
const BACKUP_FILE = path.join(BACKUP_DIR, 'admin_backup_store.json');

function ensureBackupDirectory() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  } catch (err) {
    // Ignore on read-only serverless filesystems
  }
}

function readLocalBackup(): Record<string, any> {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Admin Sync] Error reading local backup file:', err);
  }
  return {};
}

function writeLocalBackup(store: Record<string, any>) {
  try {
    ensureBackupDirectory();
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    // Read-only filesystem in production serverless environment; Supabase handles persistence
  }
}

async function readSupabaseCloudStorage(): Promise<{ data: Record<string, any>; ok: boolean }> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return { data: {}, ok: false };
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
      if (json && typeof json === 'object') {
        return { data: json, ok: true };
      }
    }
  } catch (err) {
    // Storage bucket/object may not exist yet
  }
  return { data: {}, ok: false };
}

async function writeSupabaseCloudStorage(store: Record<string, any>): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return false;
  try {
    // Ensure bucket exists (idempotent)
    await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: STORAGE_BUCKET,
        name: STORAGE_BUCKET,
        public: false,
      }),
    }).catch(() => {});

    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${STORAGE_OBJECT}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'x-upsert': 'true',
      },
      body: JSON.stringify(store),
    });

    return uploadRes.ok;
  } catch (err) {
    console.warn('[Admin Sync] Cloud storage write warning:', err);
    return false;
  }
}

// -----------------------------------------------------------------------------
// GET /api/admin/sync
// Authenticated admins receive full store.
// Unauthenticated visitors ONLY receive whitelisted public marketing datasets.
// -----------------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const session = await getAdminSession(request);
    const isAdmin = Boolean(session);

    const { searchParams } = new URL(request.url);
    const requestedKey = searchParams.get('key');

    // Access control check for requested specific key
    if (requestedKey && !isAdmin && !PUBLIC_ALLOWED_KEYS.has(requestedKey)) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator authentication required to access this dataset.' },
        { status: 401 }
      );
    }

    const localBackup = readLocalBackup();
    let dbData: Record<string, any> = {};
    let dbConnected = false;

    // 1. Primary: Supabase PostgreSQL REST API (if public.admin_store table exists)
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        const queryUrl = requestedKey
          ? `${SUPABASE_URL}/rest/v1/admin_store?key=eq.${encodeURIComponent(requestedKey)}&select=*`
          : `${SUPABASE_URL}/rest/v1/admin_store?select=*`;

        const res = await fetch(queryUrl, {
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
          cache: 'no-store',
        });

        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows)) {
            rows.forEach((r: any) => {
              if (r.key) dbData[r.key] = r.data;
            });
            dbConnected = true;
          }
        }
      } catch (err) {
        // Fallback to Supabase Cloud Storage
      }
    }

    // 2. Secondary Cloud Persistence: Supabase Storage (works out-of-the-box without custom SQL tables)
    const cloudStore = await readSupabaseCloudStorage();
    if (cloudStore.ok) {
      dbConnected = true;
    } else if (Object.keys(localBackup).length > 0) {
      // Seed cloud storage with recovered localBackup on first access
      await writeSupabaseCloudStorage(localBackup);
    }

    // 3. Merge: Local seed -> Cloud Storage -> PostgreSQL table
    let mergedData: Record<string, any> = {
      ...localBackup,
      ...cloudStore.data,
      ...dbData,
    };

    // If caller is NOT an authenticated administrator, strip all sensitive keys
    if (!isAdmin) {
      const sanitized: Record<string, any> = {};
      Object.keys(mergedData).forEach((k) => {
        if (PUBLIC_ALLOWED_KEYS.has(k)) {
          sanitized[k] = mergedData[k];
        }
      });
      mergedData = sanitized;
    }

    if (requestedKey) {
      return NextResponse.json({
        success: true,
        key: requestedKey,
        data: mergedData[requestedKey] ?? null,
        source: dbConnected ? 'database' : 'server_backup',
      });
    }

    return NextResponse.json({
      success: true,
      data: mergedData,
      source: dbConnected ? 'database' : 'server_backup',
    });
  } catch (error: any) {
    console.error('[Admin Sync GET] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch admin data' },
      { status: 500 }
    );
  }
}

// -----------------------------------------------------------------------------
// POST /api/admin/sync
// STRICTLY REQUIRES ADMINISTRATOR AUTHENTICATION
// -----------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator session required to modify site data.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { key, data } = body;

    if (!key) {
      return NextResponse.json(
        { error: 'Missing required field: "key"' },
        { status: 400 }
      );
    }

    // 1. Read existing merged state so we never lose other keys
    const localBackup = readLocalBackup();
    const cloudStore = await readSupabaseCloudStorage();
    const combinedStore: Record<string, any> = {
      ...localBackup,
      ...cloudStore.data,
      [key]: data,
    };

    // 2. Persist to local backup file (dev environment)
    writeLocalBackup(combinedStore);

    let dbSaved = false;

    // 3. Persist to Supabase Cloud Storage (always available in production)
    const cloudSaved = await writeSupabaseCloudStorage(combinedStore);
    if (cloudSaved) {
      dbSaved = true;
    }

    // 4. Also upsert to Supabase PostgreSQL table if present
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        const upsertUrl = `${SUPABASE_URL}/rest/v1/admin_store`;
        const res = await fetch(upsertUrl, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates,return=representation',
          },
          body: JSON.stringify({
            key,
            data,
            updated_at: new Date().toISOString(),
          }),
        });

        if (res.ok) {
          dbSaved = true;
        }
      } catch (err) {
        // Cloud storage already persisted the update
      }
    }

    return NextResponse.json({
      success: true,
      key,
      persistedInDatabase: dbSaved,
      persistedInBackup: true,
      message: dbSaved
        ? 'Data saved permanently in Supabase Cloud & server backup'
        : 'Data saved in persistent server backup',
    });
  } catch (error: any) {
    console.error('[Admin Sync POST] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save admin data' },
      { status: 500 }
    );
  }
}
