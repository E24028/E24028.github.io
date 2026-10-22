let CACHE_NAME = 'smart-workspace-v1';
let URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/home/index.html',
  '/chat/index.html',
  '/user/index.html',
  '/calc/index.html',
  '/quiz/index.html',
  '/login/index.html',
  '/oauth/index.html',
  '/mail-change/index.html',
  '/mail-oauth/index.html',
  '/favicon.png',
  '/qr.png'
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
                if (cache !== CACHE_NAME)
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
