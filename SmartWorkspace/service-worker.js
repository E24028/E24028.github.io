let CACHE_NAME = 'smart-workspace-v5';
let URLS_TO_CACHE = [
  '/SmartWorkspace/',
  '/SmartWorkspace/index.html',
  '/SmartWorkspace/home/',
  '/SmartWorkspace/home/index.html',
  '/SmartWorkspace/chat/',
  '/SmartWorkspace/chat/index.html',
  '/SmartWorkspace/user/',
  '/SmartWorkspace/user/index.html',
  '/SmartWorkspace/calc/',
  '/SmartWorkspace/calc/index.html',
  '/SmartWorkspace/quiz/',
  '/SmartWorkspace/quiz/index.html',
  '/SmartWorkspace/login/',
  '/SmartWorkspace/login/index.html',
  '/SmartWorkspace/oauth/',
  '/SmartWorkspace/oauth/index.html',
  '/SmartWorkspace/memo/',
  '/SmartWorkspace/memo/index.html',
  '/SmartWorkspace/mail-change/',
  '/SmartWorkspace/mail-change/index.html',
  '/SmartWorkspace/mail-oauth/',
  '/SmartWorkspace/mail-oauth/index.html',
  '/SmartWorkspace/manifest.json',
  '/SmartWorkspace/service-worker.js',
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
