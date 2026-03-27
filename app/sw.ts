/// <reference no-default-lib="true"/>
/// <reference lib="esnext"/>
/// <reference lib="webworker"/>

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const CACHE_VERSION = "v3";

const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-${CACHE_VERSION}`;

const VALID_CACHES = [PAGES_CACHE, API_CACHE, ASSETS_CACHE];

// App shell pages (MUST always be cached)
// Supported locales (keep in sync with next-intl)
const SUPPORTED_LOCALES = ["en", "de"];

// Build app shell dynamically
const APP_SHELL_PAGES = [
  "/",
  ...SUPPORTED_LOCALES.map((l) => `/${l}`),
  ...SUPPORTED_LOCALES.map((l) => `/${l}/settings`),
];

// Extract locale from URL
function getLocaleFromPath(path: string): string {
  const seg = path.split("/")[1];
  return SUPPORTED_LOCALES.includes(seg) ? seg : "en";
}

// Helper: normalize URL → cache key
function getCacheKey(request: Request): string {
  const url = new URL(request.url);
  return url.pathname.replace(/\/$/, "") || "/";
}

// ─────────────────────────────────────────────
// INSTALL
// ─────────────────────────────────────────────
self.addEventListener("install", (event) => {
  const manifestUrls = (self.__SW_MANIFEST || []).map((entry) =>
    typeof entry === "string" ? entry : entry.url,
  );

  event.waitUntil(
    (async () => {
      const pagesCache = await caches.open(PAGES_CACHE);
      const assetsCache = await caches.open(ASSETS_CACHE);

      // 🔥 Precache pages (avoid redirect pollution)
      for (const url of APP_SHELL_PAGES) {
        try {
          const res = await fetch(url, {
            redirect: "manual",
            headers: { "x-sw": "1" },
          });

          if (res.ok) {
            const key = url.replace(/\/$/, "") || "/";
            await pagesCache.put(key, res);
          }
        } catch {
          // ignore
        }
      }

      // 🔥 Precache assets
      for (const url of manifestUrls) {
        try {
          const res = await fetch(url, {
            redirect: "manual",
            headers: { "x-sw": "1" },
          });

          if (res.ok) {
            const key = new URL(url, self.location.origin).pathname;
            await assetsCache.put(key, res);
          }
        } catch {
          // ignore
        }
      }

      await self.skipWaiting();
    })(),
  );
});

// ─────────────────────────────────────────────
// ACTIVATE
// ─────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map((key) => {
          if (!VALID_CACHES.includes(key)) {
            return caches.delete(key);
          }
        }),
      );

      await self.clients.claim();
    })(),
  );
});

// ─────────────────────────────────────────────
// FETCH
// ─────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only GET + same-origin
  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  const url = new URL(request.url);

  // 1. Navigation (HTML)
  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // 2. API
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // 3. Assets
  event.respondWith(networkFirst(request, ASSETS_CACHE));
});

// ─────────────────────────────────────────────
// NAVIGATION HANDLER (APP SHELL)
// ─────────────────────────────────────────────
async function handleNavigation(request: Request): Promise<Response> {
  const key = getCacheKey(request);
  const url = new URL(request.url);
  const locale = getLocaleFromPath(url.pathname);

  try {
    const res = await fetch(request, {
      headers: { "x-sw": "1" },
    });

    if (res.ok) {
      const cache = await caches.open(PAGES_CACHE);
      await cache.put(key, res.clone());
    }

    return res;
  } catch {
    const cache = await caches.open(PAGES_CACHE);

    // 1. exact match
    const cached = (await cache.match(key)) || (await cache.match(key + "/"));

    if (cached) return cached;

    // 🔥 2. fallback to SAME LOCALE homepage
    const localeHome =
      (await cache.match(`/${locale}`)) || (await cache.match(`/${locale}/`));

    if (localeHome) return localeHome;

    // 🔥 3. fallback to default (en)
    const fallback = (await cache.match("/en")) || (await cache.match("/"));

    if (fallback) return fallback;

    return offlineFallback();
  }
}

// ─────────────────────────────────────────────
// NETWORK FIRST (API + ASSETS)
// ─────────────────────────────────────────────
async function networkFirst(
  request: Request,
  cacheName: string,
): Promise<Response> {
  const key = getCacheKey(request);

  try {
    const res = await fetch(request, {
      headers: { "x-sw": "1" },
    });

    if (res.ok && res.type !== "opaque") {
      const cache = await caches.open(cacheName);
      await cache.put(key, res.clone());
    }

    return res;
  } catch {
    const cache = await caches.open(cacheName);

    const cached = (await cache.match(key)) || (await cache.match(key + "/"));

    if (cached) return cached;

    return new Response("", { status: 503 });
  }
}

// ─────────────────────────────────────────────
// OFFLINE FALLBACK
// ─────────────────────────────────────────────
function offlineFallback(): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Offline</title>
<style>
body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#fff;text-align:center}
</style>
</head>
<body>
<div>
<h1>You're Offline</h1>
<p>Please check your connection.</p>
<button onclick="location.reload()">Retry</button>
</div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
