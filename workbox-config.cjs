// workbox-config.js
module.exports = {
  globDirectory: "dist",
  globPatterns: ["**/*.{html,js,css,png,jpg,svg,woff,woff2}"],
  swDest: "dist/service-worker.js",
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
      },
    },
  ],
};
