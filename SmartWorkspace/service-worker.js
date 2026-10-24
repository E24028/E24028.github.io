let CACHE_NAME = 'smart-workspace-v2';
let URLS_TO_CACHE = [
  '/SmartWorkspace/',
  '/SmartWorkspace/index.html',
  '/SmartWorkspace/home/index.html',
  '/SmartWorkspace/chat/index.html',
  '/SmartWorkspace/user/index.html',
  '/SmartWorkspace/calc/index.html',
  '/SmartWorkspace/quiz/index.html',
  '/SmartWorkspace/login/index.html',
  '/SmartWorkspace/oauth/index.html',
  '/SmartWorkspace/memo/index.html',
  '/SmartWorkspace/mail-change/index.html',
  '/SmartWorkspace/mail-oauth/index.html',
  '/SmartWorkspace/favicon.png',
  '/SmartWorkspace/qr.png'
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
