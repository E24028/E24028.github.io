let CACHE_NAME = 'kanji-writing-v1';
let URLS_TO_CACHE = [
  '/漢字「書き」攻略/',
  '/漢字「書き」攻略/index.html',
  '/漢字「書き」攻略/favicon.png',
  '/漢字「書き」攻略/manifest.json',
  '/漢字「書き」攻略/service-worker.js',
  '/漢字コンクールデータベース.js',
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
                if (cache !== CACHE_NAME && cache.startsWith('kanji-writing-'))
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
