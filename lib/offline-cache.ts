/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

let cacheDB: any = null;

async function getCacheDB() {
  if (typeof window === 'undefined') return null;
  if (!cacheDB) {
    const PouchDB = (await import('pouchdb-browser')).default;
    cacheDB = new PouchDB('offline_cache');
  }
  return cacheDB;
}

/**
 * Get cached data by key from PouchDB
 */
export async function getCachedData(key: string) {
  const db = await getCacheDB();
  if (!db) return null;
  try {
    const doc = await db.get(key);
    return doc.data;
  } catch {
    return null;
  }
}

/**
 * Save data to PouchDB cache
 */
export async function setCachedData(key: string, data: any) {
  const db = await getCacheDB();
  if (!db) return;
  try {
    const existing = await db.get(key).catch(() => null);
    await db.put({
      _id: key,
      _rev: existing?._rev,
      data,
      cachedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[offline-cache] write failed:', err);
  }
}

/**
 * Fetch with offline fallback:
 *  - Online → fetch from network, save to PouchDB cache, return data
 *  - Offline or error → return from PouchDB cache
 */
export async function fetchWithCache(
  cacheKey: string,
  url: string,
  options?: RequestInit,
) {
  // Try network first
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const data = await res.json();
      // Save to cache in background (don't await)
      setCachedData(cacheKey, data).catch(() => {});
      return data;
    }
  } catch {
    // Network error — fall through to cache
  }

  // Fallback to PouchDB cache
  const cached = await getCachedData(cacheKey);
  return cached ?? null;
}
