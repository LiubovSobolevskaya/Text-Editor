const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Registers a route handler for navigation requests and caches them using 'pageCache'
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Defines the name for the asset cache
const cacheName = 'asset-cache';

// Defines a callback function to determine if a request should be matched for caching
// Matches requests with destination 'style', 'script', or 'worker' and logs the request object
const matchCallback = ({ request }) => {
  console.log(request);
  return (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker'
  );
};

// Registers a route handler for matching requests based on the matchCallback function
registerRoute(
  matchCallback,
  // Uses StaleWhileRevalidate strategy for caching with the specified cacheName
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      // Includes plugins for handling cacheable responses and expiration settings
      new CacheableResponsePlugin({
        statuses: [0, 200], // Responses with status codes 0 (opaque responses) and 200 (OK) are cacheable
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Sets a maximum of 60 cache entries and a maximum age of 30 days (in seconds)
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

