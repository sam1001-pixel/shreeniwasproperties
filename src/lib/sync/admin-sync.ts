/**
 * Admin Data Database Sync Helper
 * Automatically saves all portal actions to Supabase DB & Server-side persistent storage
 * Ensures data is NEVER deleted or lost when browser cache is cleared.
 */

export async function syncAdminDataToDatabase(key: string, data: any): Promise<boolean> {
  try {
    // 1. Always keep local client copy updated for immediate reactive UI
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn(`[Sync Helper] LocalStorage quota or save issue for ${key}:`, e);
      }
    }

    // 2. Persist to Server & Database via /api/admin/sync
    const response = await fetch('/api/admin/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, data }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.success;
    }
  } catch (error) {
    console.error(`[Sync Helper] Failed to sync ${key} to database:`, error);
  }
  return false;
}

export async function fetchAdminDataFromDatabase(): Promise<Record<string, any>> {
  try {
    const response = await fetch('/api/admin/sync', {
      cache: 'no-store',
    });
    if (response.ok) {
      const result = await response.json();
      return result.data || {};
    }
  } catch (error) {
    console.warn('[Sync Helper] Failed to fetch database data:', error);
  }
  return {};
}
