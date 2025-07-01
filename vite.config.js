import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import * as dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const backendUrl = isProduction ? "https://uzigateway.vercel.app" : "http://192.168.100.80:7000";

export default defineConfig({
  server: {
    proxy: isProduction
      ? {}
      : {
          "/api": backendUrl,
        },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Uzitrake",
        short_name: "Uzitrake",
        description: "Your financial future unlocked",
        theme_color: "#ffffff",

        display_override: ["window-controls-overlay", "minimal-ui"],

        icons: [
          {
            src: "/images/uzilogo/logo-clear-64.png",
            sizes: "64x164",
            type: "image/png",
          },
          {
            src: "/images/uzilogo/logo-clear-128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/images/uzilogo/logo-clear-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/uzilogo/logo-clear-256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/images/uzilogo/logo-clear-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        protocol_handlers: [
          {
            protocol: "web+Uzitrake",
            url: "/?q=%s",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
          {
            // Offline fallback
            urlPattern: /\/.*/,
            handler: "NetworkOnly",
            options: {
              plugins: [
                {
                  cacheWillUpdate: async ({ request, response }) => {
                    if (request.destination === "document" && !navigator.onLine) {
                      const cache = await caches.open("offline-fallback");
                      return await cache.match("/offline.html");
                    }
                    return response;
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
  },
  base: "/",
  css: {
    modules: {
      generateScopedName: isProduction ? "[hash:base64:6]" : "[local]__[hash:base64:5]",
    },
  },
  define: {
    "process.env.BACKEND_URL": JSON.stringify(backendUrl),
  },
});
