const CACHE_PREFIX = "study-finder-pwa-";
const CACHE_NAME = CACHE_PREFIX + "content-05cc59a2c7cf";
const BASE = "/Study_Finder/";
const APP_SHELL = ["/Study_Finder/","/Study_Finder/index.html","/Study_Finder/offline.html","/Study_Finder/manifest.webmanifest","/Study_Finder/assets/icons/icon-192.png","/Study_Finder/assets/icons/icon-512.png","/Study_Finder/assets/css/app.css","/Study_Finder/assets/css/pwa.css","/Study_Finder/assets/css/exam-modes.css","/Study_Finder/assets/css/oral-study.css","/Study_Finder/assets/js/gas-run-shim.js","/Study_Finder/assets/js/app.js","/Study_Finder/assets/js/exam-modes.js","/Study_Finder/assets/js/oral-study.js","/Study_Finder/assets/js/pwa-client.js"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))); }
    return response;
  }).catch(async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === "navigate") return (await cache.match(BASE + "index.html")) || cache.match(BASE + "offline.html");
    return Response.error();
  }));
});