/* eslint-disable no-restricted-globals */
// Basic service worker setup for Create React App
// You can customize this file for caching, push notifications, etc.
import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute((self as any).__WB_MANIFEST || []);

const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

export {};
