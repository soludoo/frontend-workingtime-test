/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="webworker"/>

import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v2';
const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-${CACHE_VERSION}`;
const VALID_CACHES = [PAGES_CACHE, API_CACHE, ASSETS_CACHE];

// Important pages to precache during install
const APP_SHELL_PAGES = [
  '/en',
  '/en/settings',
  '/en/settings/personal-information',
  '/en/settings/preferences',
  '/en/settings/support',
  '/en/settings/about-app',
];

// ─── INSTALL: Precache app shell pages + Next.js Assets ───
self.addEventListener('install', (event) => {
  const manifestUrls = (self.__SW_MANIFEST || []).map((entry) =>
    typeof entry === 'string' ? entry : entry.url,
  );

  event.waitUntil(
    Promise.all([
      // Precache HTML pages
      caches.open(PAGES_CACHE).then((cache) =>
        Promise.allSettled(
          APP_SHELL_PAGES.map(async (url) => {
            try {
              const response = await fetch(url);
              if (response.ok) await cache.put(url, response);
            } catch {}
          }),
        ),
      ),
      // Precache JS/CSS assets needed for hydration
      caches.open(ASSETS_CACHE).then((cache) =>
        Promise.allSettled(
          manifestUrls.map(async (url) => {
            try {
              const response = await fetch(url);
              if (response.ok) await cache.put(url, response);
            } catch {}
          }),
        ),
      ),
    ]).then(() => self.skipWaiting()),
  );
});

// ─── ACTIVATE: Clean ALL old caches + claim clients ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!VALID_CACHES.includes(key)) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ─── FETCH ───────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET
  if (request.method !== 'GET') return;

  // 1. Navigation (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, PAGES_CACHE, true));
    return;
  }

  // 2. API GET requests
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, API_CACHE, false));
    return;
  }

  // 3. Same-origin static assets (JS, CSS, images, fonts)
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request, ASSETS_CACHE, false));
    return;
  }
});

// ─── NetworkFirst Strategy ───────────────────────
// Always try network. Cache the response. On failure, fallback to cache.
async function networkFirst(
  request: Request,
  cacheName: string,
  isNavigation: boolean,
): Promise<Response> {
  try {
    const response = await fetch(request);
    if (response.ok && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Network failed → try cache
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;

    // Try matching without query string for navigation
    if (isNavigation) {
      const url = new URL(request.url);
      const pathOnly = url.origin + url.pathname;
      const cachedByPath = await cache.match(pathOnly);
      if (cachedByPath) return cachedByPath;
    }

    // Nothing cached
    if (isNavigation) return offlineFallback();
    return new Response('', { status: 503 });
  }
}

function offlineFallback(): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline - Working App</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,-apple-system,sans-serif;display:flex;
      justify-content:center;align-items:center;min-height:100vh;
      background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);
      color:#fff;text-align:center;padding:2rem}
    .emoji{font-size:4rem;margin-bottom:1rem;animation:pulse 2s ease-in-out infinite}
    h1{font-size:1.75rem;margin-bottom:.5rem}
    p{opacity:.85;max-width:320px;line-height:1.5;margin-bottom:1.5rem}
    button{padding:.75rem 2rem;border-radius:9999px;border:2px solid rgba(255,255,255,.5);
      background:rgba(255,255,255,.15);color:#fff;font-size:1rem;
      font-weight:600;cursor:pointer;backdrop-filter:blur(10px)}
    button:hover{background:rgba(255,255,255,.25)}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
  </style>
</head>
<body>
  <div>
    <div class="emoji">📡</div>
    <h1>You're Offline</h1>
    <p>Please check your internet connection and try again.</p>
    <button onclick="location.reload()">Try Again</button>
  </div>
</body>
</html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } },
  );
}
