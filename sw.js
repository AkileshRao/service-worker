const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
}

const cacheMatch = async (request, preloadResponsePromise) => {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) return cachedResponse
    try {
        const networkResponse = await fetch(request)
        const cache = await caches.open("v1")
        await cache.put(request, networkResponse.clone())
        return networkResponse
    } catch (err) {
        return new Response("Response not found!")
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCache([
        "/",
        "/app.js",
        "/index.html",
        "/contact.html",
        "/profile.html",
        "/images/contactus.png",
        "/images/home.jpg",
        "/images/profile.jpg"
    ]))
})

self.addEventListener("activate", event => {
    event.waitUntil(async () => {
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
    })
})
self.addEventListener("fetch", (event) => {
    event.respondWith(cacheMatch(event.request))
})