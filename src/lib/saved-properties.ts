'use client';

export interface SavedProperty {
  id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  price: string;
  bhk?: string;
  sqft?: number | string;
  type?: string;
  image: string;
  reraApproved?: boolean;
  zeroBrokerage?: boolean;
  savedAt: number;
}

const STORAGE_KEY = 'shreeniwas_saved_items';
const LEGACY_IDS_KEY = 'shreeniwas_user_favorites';

/**
 * Normalizes property identifiers for resilient matching
 */
export function normalizeIdentifier(val: string | number | undefined | null): string {
  if (!val) return '';
  return String(val).trim().toLowerCase();
}

/**
 * Returns all saved properties from localStorage, handling sync with user session
 */
export function getSavedProperties(): SavedProperty[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let items: SavedProperty[] = raw ? JSON.parse(raw) : [];

    // If user is logged in, merge with user-specific favorites
    const sessionRaw = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.email) {
        const userKey = `shreeniwas_saved_favorites_${session.email}`;
        const userRaw = localStorage.getItem(userKey);
        if (userRaw) {
          const userItems: SavedProperty[] = JSON.parse(userRaw);
          // Merge unique items by id and slug
          const existingIds = new Set(items.map(i => normalizeIdentifier(i.id)));
          const existingSlugs = new Set(items.map(i => normalizeIdentifier(i.slug)));
          
          for (const uItem of userItems) {
            if (!existingIds.has(normalizeIdentifier(uItem.id)) && (!uItem.slug || !existingSlugs.has(normalizeIdentifier(uItem.slug)))) {
              items.push(uItem);
              existingIds.add(normalizeIdentifier(uItem.id));
              if (uItem.slug) existingSlugs.add(normalizeIdentifier(uItem.slug));
            }
          }
          // Persist back to unified storage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
      }
    }

    return items;
  } catch (err) {
    console.error('Failed to parse saved properties:', err);
    return [];
  }
}

/**
 * Checks if a property is saved by id, slug, or title
 */
export function isPropertySaved(idOrSlug: string | number | undefined | null): boolean {
  if (!idOrSlug) return false;
  const target = normalizeIdentifier(idOrSlug);
  const items = getSavedProperties();
  
  return items.some(item => 
    normalizeIdentifier(item.id) === target || 
    normalizeIdentifier(item.slug) === target
  );
}

/**
 * Toggles a property in saved list with full details and dispatches sync events
 */
export function toggleSaveProperty(prop: Partial<SavedProperty> & { id: string | number; title: string }): { saved: boolean; count: number; item: SavedProperty } {
  if (typeof window === 'undefined') {
    return { saved: false, count: 0, item: prop as SavedProperty };
  }

  const items = getSavedProperties();
  const targetId = normalizeIdentifier(prop.id);
  const targetSlug = prop.slug ? normalizeIdentifier(prop.slug) : '';

  const existingIndex = items.findIndex(item => 
    normalizeIdentifier(item.id) === targetId || 
    (targetSlug && normalizeIdentifier(item.slug) === targetSlug)
  );

  let willBeSaved = false;
  let savedItem: SavedProperty;

  if (existingIndex >= 0) {
    // Remove from saved list
    savedItem = items[existingIndex];
    items.splice(existingIndex, 1);
    willBeSaved = false;
  } else {
    // Add to saved list
    savedItem = {
      id: String(prop.id),
      slug: prop.slug || String(prop.id),
      title: prop.title || 'Luxury Rajasthan Property',
      location: prop.location || 'Rajasthan',
      city: prop.city || (prop.location?.includes('Jodhpur') ? 'Jodhpur' : prop.location?.includes('Udaipur') ? 'Udaipur' : 'Jaipur'),
      price: prop.price || 'Price on Request',
      bhk: prop.bhk || '3 BHK',
      sqft: prop.sqft || 1800,
      type: prop.type || 'Villa',
      image: prop.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      reraApproved: Boolean(prop.reraApproved),
      zeroBrokerage: Boolean(prop.zeroBrokerage),
      savedAt: Date.now()
    };
    items.unshift(savedItem);
    willBeSaved = true;
  }

  try {
    // 1. Update primary items store
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // 2. Update legacy IDs list for legacy components
    const idsList = items.map(i => i.id);
    localStorage.setItem(LEGACY_IDS_KEY, JSON.stringify(idsList));

    // 3. Sync into user-specific session if logged in
    const sessionRaw = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.email) {
        const userKey = `shreeniwas_saved_favorites_${session.email}`;
        localStorage.setItem(userKey, JSON.stringify(items));
      }
    }

    // 4. Dispatch global events
    window.dispatchEvent(new CustomEvent('shreeniwas_favorites_updated', {
      detail: { items, count: items.length, lastToggled: savedItem, isSaved: willBeSaved }
    }));

    window.dispatchEvent(new CustomEvent('shreeniwas_save_toast', {
      detail: {
        action: willBeSaved ? 'added' : 'removed',
        item: savedItem
      }
    }));
  } catch (err) {
    console.error('Error saving property to localStorage:', err);
  }

  return { saved: willBeSaved, count: items.length, item: savedItem };
}

/**
 * Removes a property from saved list
 */
export function removeSavedProperty(idOrSlug: string | number): { count: number } {
  if (typeof window === 'undefined') return { count: 0 };
  
  const items = getSavedProperties();
  const target = normalizeIdentifier(idOrSlug);

  const filtered = items.filter(item => 
    normalizeIdentifier(item.id) !== target && 
    normalizeIdentifier(item.slug) !== target
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    localStorage.setItem(LEGACY_IDS_KEY, JSON.stringify(filtered.map(i => i.id)));

    const sessionRaw = localStorage.getItem('shreeniwas_user_session') || sessionStorage.getItem('shreeniwas_user_session');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      if (session?.email) {
        localStorage.setItem(`shreeniwas_saved_favorites_${session.email}`, JSON.stringify(filtered));
      }
    }

    window.dispatchEvent(new CustomEvent('shreeniwas_favorites_updated', {
      detail: { items: filtered, count: filtered.length }
    }));
  } catch (err) {}

  return { count: filtered.length };
}

/**
 * Returns live count of saved properties
 */
export function getSavedCount(): number {
  return getSavedProperties().length;
}
