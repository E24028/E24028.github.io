let CACHE_NAME = 'storage-editor-v1';
let URLS_TO_CACHE = [
  '/localStorage/',
  '/localStorage/index.html',
  '/localStorage/manifest.json',
  '/localStorage/service-worker.js',
  '/localStorage/favicon.png',
  '/javascript.js'
];

// インストール時にキャッシュを保存
self.addEventListener('install',
  (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(
          (cache) => {
            return cache.addAll(URLS_TO_CACHE);
        }
      )
    );
  }
);

// リクエスト時にキャッシュを返す（ネットワークファーストまたはキャッシュファースト）
self.addEventListener('fetch',
  (event) => {
    event.respondWith(
      caches.match(event.request).then(
        (response) => {
          return response || fetch(event.request);
        }
      )
    );
  }
);

// 古いキャッシュの削除
self.addEventListener('activate',
  (event) => {
    event.waitUntil(
      caches.keys().then(
        (cacheNames) => {
          return Promise.all(
            cacheNames.map(
              (cache) => {
                if (cache !== CACHE_NAME && cache.startsWith('storage-editor-'))
                {
                  return caches.delete(cache);
                }
              }
            )
          );
        }
      )
    );
  }
);
