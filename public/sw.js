const cacheName = 'v1';

self.addEventListener('activate', (e) => {
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

// Call fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res!=null){
                    return res
                } else {
                    return fetch(e.request).then(res => {
                        const resClone = res.clone();
                        caches.open(cacheName).then(
                            cache => cache.put(e.request, resClone)
                        )
                        return res;
                    })
                }
            })
    )
})