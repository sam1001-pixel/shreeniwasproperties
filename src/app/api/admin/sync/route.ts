import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAdminSession } from '@/lib/auth/security';

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key on the server if available to safely bypass client RLS
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Whitelist of public non-sensitive keys permitted for unauthenticated visitor reads
const PUBLIC_ALLOWED_KEYS = new Set([
  'shreeniwas_admin_properties',
  'shreeniwas_new_projects',
  'shreeniwas_blog_posts',
  'shreeniwas_blocked_visit_dates',
  'shreeniwas_admin_reels',
  'shreeniwas_tariff_settings',
  'hero_slides',
  'site_settings',
]);

// Local persistent filesystem backup path (server-side safety net)
const BACKUP_DIR = path.join(process.cwd(), 'data');
const BACKUP_FILE = path.join(BACKUP_DIR, 'admin_backup_store.json');

function ensureBackupDirectory() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[Admin Sync] Could not create backup directory:', err);
  }
}

function readLocalBackup(): Record<string, any> {
  try {
    ensureBackupDirectory();
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
    console.warn('[Admin Sync] Error writing local backup file:', err);
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

    let dbData: Record<string, any> = {};
    let dbConnected = false;

    // 1. Fetch authoritative data from database
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const queryUrl = requestedKey
          ? `${SUPABASE_URL}/rest/v1/admin_store?key=eq.${encodeURIComponent(requestedKey)}&select=*`
          : `${SUPABASE_URL}/rest/v1/admin_store?select=*`;

        const res = await fetch(queryUrl, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
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
        console.warn('[Admin Sync] Database query error, fallback active:', err);
      }
    }

    // 2. Read local server-side persistent backup
    const localBackup = readLocalBackup();

    // 3. Merge: Database takes precedence, local backup fills gaps
    let mergedData = { ...localBackup, ...dbData };

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

    // 1. Immediately persist to server-side backup file
    const localBackup = readLocalBackup();
    localBackup[key] = data;
    writeLocalBackup(localBackup);

    let dbSaved = false;
    let dbErrorMsg: string | null = null;

    // 2. Upsert to Supabase PostgreSQL Database using server credentials
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const upsertUrl = `${SUPABASE_URL}/rest/v1/admin_store`;
        const res = await fetch(upsertUrl, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
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
        } else {
          const errText = await res.text();
          dbErrorMsg = errText;
          console.warn('[Admin Sync POST] Supabase status:', res.status, errText);
        }
      } catch (err: any) {
        dbErrorMsg = err?.message || 'Network error';
        console.warn('[Admin Sync POST] Supabase insert failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      key,
      persistedInDatabase: dbSaved,
      persistedInBackup: true,
      message: dbSaved
        ? 'Data saved permanently in database & server backup'
        : 'Data saved in persistent server backup (DB sync pending schema)',
      detail: dbErrorMsg,
    });
  } catch (error: any) {
    console.error('[Admin Sync POST] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save admin data' },
      { status: 500 }
    );
  }
}
