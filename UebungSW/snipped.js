// bazel-out/darwin_arm64-fastbuild-ST-2e5f3376adb5/bin/packages/service-worker/worker/src/named-cache-storage.mjs
var NamedCacheStorage = class {
    constructor(original, cacheNamePrefix) {
    this.original = original;
    this.cacheNamePrefix = cacheNamePrefix;
    }
    delete(cacheName) {
    return this.original.delete(`${this.cacheNamePrefix}:${cacheName}`);
    }
    has(cacheName) {
    return this.original.has(`${this.cacheNamePrefix}:${cacheName}`);
    }
    async keys() {
    const prefix = `${this.cacheNamePrefix}:`;
    const allCacheNames = await this.original.keys();
    const ownCacheNames = allCacheNames.filter((name) => name.startsWith(prefix));
    return ownCacheNames.map((name) => name.slice(prefix.length));
    }
    match(request, options) {
    return this.original.match(request, options);
    }
    async open(cacheName) {
    const cache = await this.original.open(`${this.cacheNamePrefix}:${cacheName}`);
    return Object.assign(cache, { name: cacheName });
    }
};
