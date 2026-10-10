import fs from 'fs';
import path from 'path';

export interface PersistentUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users_store.json');

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('[UserStore] Could not create data directory:', err);
  }
}

function readLocalUsers(): Record<string, PersistentUser> {
  try {
    ensureDataDirectory();
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[UserStore] Error reading local users file:', err);
  }
  return {};
}

function writeLocalUsers(users: Record<string, PersistentUser>) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[UserStore] Error writing local users file:', err);
  }
}

/**
 * Find user by email (case-insensitive)
 */
export async function findUserByEmail(email: string): Promise<PersistentUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Try querying Supabase if available
  const apiKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (SUPABASE_URL && apiKey) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_accounts?email=eq.${encodeURIComponent(normalizedEmail)}&select=*`,
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
          },
          cache: 'no-store',
        }
      );
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const r = rows[0];
          return {
            id: r.id,
            email: r.email,
            name: r.full_name || r.name,
            phone: r.phone,
            role: r.role,
            passwordHash: r.password_hash,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          };
        }
      }
    } catch (err) {
      // Fall through to local persistent file store
    }
  }

  // 2. Query persistent local file store
  const localUsers = readLocalUsers();
  return localUsers[normalizedEmail] || null;
}

/**
 * Save or register a new user
 */
export async function saveUser(user: PersistentUser): Promise<boolean> {
  const normalizedEmail = user.email.trim().toLowerCase();

  // 1. Save to persistent local file store immediately
  const localUsers = readLocalUsers();
  localUsers[normalizedEmail] = user;
  writeLocalUsers(localUsers);

  // 2. Persist to Supabase if available
  const apiKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (SUPABASE_URL && apiKey) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_accounts`, {
        method: 'POST',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          id: user.id,
          email: normalizedEmail,
          full_name: user.name,
          phone: user.phone || null,
          role: user.role,
          password_hash: user.passwordHash,
          updated_at: user.updatedAt,
        }),
      });
    } catch (err) {
      console.warn('[UserStore] Supabase save error:', err);
    }
  }

  return true;
}

/**
 * Update user password hash
 */
export async function updateUserPassword(email: string, newPasswordHash: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  // 1. Update in local file store
  const localUsers = readLocalUsers();
  const existing = localUsers[normalizedEmail];
  if (existing) {
    existing.passwordHash = newPasswordHash;
    existing.updatedAt = now;
    writeLocalUsers(localUsers);
  }

  // 2. Update in Supabase
  const apiKey = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (SUPABASE_URL && apiKey) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/user_accounts?email=eq.${encodeURIComponent(normalizedEmail)}`, {
        method: 'PATCH',
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password_hash: newPasswordHash,
          updated_at: now,
        }),
      });
    } catch (err) {
      console.warn('[UserStore] Supabase update password error:', err);
    }
  }

  return true;
}
