/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { fetchWithCache } from './offline-cache';

/**
 * Preload all essential API data into PouchDB cache
 * Called once when the homepage loads (while online).
 * This ensures dropdown data is available when user goes offline.
 */
export async function preloadEssentialData() {
  if (typeof window === 'undefined') return;

  const endpoints = [
    { key: 'projects', url: '/api/projects' },
    { key: 'locations', url: '/api/locations' },
    { key: 'break_types', url: '/api/break-types' },
    { key: 'work_summary', url: '/api/timer/work-summary' },
    { key: 'profile', url: '/api/settings/profile' },
    { key: 'notifications', url: '/api/notifications' },
    { key: 'correction_types', url: '/api/correction/type' },
    { key: 'leave_types', url: '/api/leave/type' },
  ];

  const results = await Promise.allSettled(
    endpoints.map(({ key, url }) => fetchWithCache(key, url)),
  );

  const cached = results.filter((r) => r.status === 'fulfilled').length;
  console.log(`[preload] Cached ${cached}/${endpoints.length} endpoints`);
}
