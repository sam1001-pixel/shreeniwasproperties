import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { getAdminSession } from '@/lib/auth/security';

// Supabase REST configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Direct PostgreSQL connection (pre-configured by Vercel Supabase integration)
const POSTGRES_CONNECTION_STRING =
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

let pgPool: Pool | null = null;
let schemaInitialized = false;

function getPgPool(): Pool | null {
  if (!POSTGRES_CONNECTION_STRING) return null;
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: POSTGRES_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
      max: 3,
      connectionTimeoutMillis: 8000,
    });
  }
  return pgPool;
}

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
    // Read-only filesystem in production serverless environment; PostgreSQL handles persistence
  }
}

async function ensureAdminStoreSchemaAndSeed(localBackup: Record<string, any>): Promise<void> {
  if (schemaInitialized) return;
  const pool = getPgPool();
  if (!pool) return;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.admin_store (
        key TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
      );
      ALTER TABLE public.admin_store ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Service role full access admin_store" ON public.admin_store;
      CREATE POLICY "Service role full access admin_store"
        ON public.admin_store
        FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);
    `);

    // Seed any recovered backup keys that do not yet exist in PostgreSQL
    for (const [k, v] of Object.entries(localBackup)) {
      if (k === 'test_sync_key') continue;
      await pool.query(
        `INSERT INTO public.admin_store (key, data, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO NOTHING`,
        [k, JSON.stringify(v)]
      );
    }

    await pool.query(`NOTIFY pgrst, 'reload schema';`).catch(() => {});
    schemaInitialized = true;
  } catch (err) {
    console.warn('[Admin Sync] Auto-schema initialization warning:', err);
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
    await ensureAdminStoreSchemaAndSeed(localBackup);

    let dbData: Record<string, any> = {};
    let dbConnected = false;

    // 1. Primary: Direct PostgreSQL query via POSTGRES_URL
    const pool = getPgPool();
    if (pool) {
      try {
        const res = requestedKey
          ? await pool.query('SELECT key, data FROM public.admin_store WHERE key = $1', [requestedKey])
          : await pool.query('SELECT key, data FROM public.admin_store');
        for (const row of res.rows) {
          if (row.key) {
            dbData[row.key] = row.data;
          }
        }
        dbConnected = true;
      } catch (pgErr) {
        console.warn('[Admin Sync] Direct PG query fallback:', pgErr);
      }
    }

    // 2. Secondary fallback: Supabase REST API
    if (!dbConnected && SUPABASE_URL && SUPABASE_KEY) {
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
        console.warn('[Admin Sync] REST query error, fallback active:', err);
      }
    }

    // 3. Merge: Database takes precedence, recovered server backup fills any missing keys
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

    // 1. Update local backup file when running in writable dev environment
    const localBackup = readLocalBackup();
    localBackup[key] = data;
    writeLocalBackup(localBackup);

    await ensureAdminStoreSchemaAndSeed(localBackup);

    let dbSaved = false;
    let dbErrorMsg: string | null = null;

    // 2. Primary: Upsert directly to PostgreSQL Database
    const pool = getPgPool();
    if (pool) {
      try {
        await pool.query(
          `INSERT INTO public.admin_store (key, data, updated_at)
           VALUES ($1, $2::jsonb, NOW())
           ON CONFLICT (key) DO UPDATE
           SET data = EXCLUDED.data, updated_at = NOW()`,
          [key, JSON.stringify(data)]
        );
        dbSaved = true;
      } catch (pgErr: any) {
        dbErrorMsg = pgErr?.message || 'PG Upsert Error';
        console.warn('[Admin Sync POST] Direct PG upsert error:', pgErr);
      }
    }

    // 3. Secondary fallback: Upsert via Supabase REST API
    if (!dbSaved && SUPABASE_URL && SUPABASE_KEY) {
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
          dbErrorMsg = null;
        } else {
          const errText = await res.text();
          dbErrorMsg = errText;
        }
      } catch (err: any) {
        dbErrorMsg = err?.message || 'Network error';
      }
    }

    return NextResponse.json({
      success: true,
      key,
      persistedInDatabase: dbSaved,
      persistedInBackup: true,
      message: dbSaved
        ? 'Data saved permanently in PostgreSQL database'
        : 'Data saved in persistent server backup',
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
