console.log("Service-worker file connected!")

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1;";

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/index.js',
  '/db.js',
  "assets/images/icons/icon-72x72.png",
  "assets/images/icons/icon-96x96.png",
];