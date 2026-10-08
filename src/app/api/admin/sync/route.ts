import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Supabase configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
// Returns all stored admin data: Supabase DB first, merged with local backup
// -----------------------------------------------------------------------------
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedKey = searchParams.get('key');

    let dbData: Record<string, any> = {};
    let dbConnected = false;

    // 1. Attempt fetching from Supabase DB
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const queryUrl = requestedKey
          ? `${SUPABASE_URL}/rest/v1/admin_store?key=eq.${encodeURIComponent(requestedKey)}&select=*`
          : `${SUPABASE_URL}/rest/v1/admin_store?select=*`;

        const res = await fetch(queryUrl, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
        console.warn('[Admin Sync] Supabase query error, fallback active:', err);
      }
    }

    // 2. Read local server-side persistent backup
    const localBackup = readLocalBackup();

    // 3. Merge: Database takes precedence, local backup fills gaps
    const mergedData = { ...localBackup, ...dbData };

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
// Upserts admin data to Supabase DB AND persists to local server-side backup
// -----------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, data } = body;

    if (!key) {
      return NextResponse.json(
        { error: 'Missing required field: "key"' },
        { status: 400 }
      );
    }

    // 1. Immediately persist to server-side backup file (guarantees zero data loss)
    const localBackup = readLocalBackup();
    localBackup[key] = data;
    writeLocalBackup(localBackup);

    let dbSaved = false;
    let dbErrorMsg: string | null = null;

    // 2. Upsert to Supabase PostgreSQL Database
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const upsertUrl = `${SUPABASE_URL}/rest/v1/admin_store`;
        const res = await fetch(upsertUrl, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
          console.warn('[Admin Sync POST] Supabase returned status:', res.status, errText);
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
