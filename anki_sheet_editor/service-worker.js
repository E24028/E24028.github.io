let CACHE_NAME = 'anki-sheet-editor-v2';
let URLS_TO_CACHE = [
  '/anki_sheet_editor/',
  '/anki_sheet_editor/voton/callback/',
  '/anki_sheet_editor/voton/callback/index.html',
  '/anki_sheet_editor/index.html',
  '/anki_sheet_editor/manifest.json',
  '/anki_sheet_editor/service-worker.js',
  '/anki_sheet_editor/favicon.png',
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
                if (cache !== CACHE_NAME && cache.startsWith('anki-sheet-editor-'))
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
