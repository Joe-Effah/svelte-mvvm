import type { ICache } from "./CacheInterface.ts";


export class Cachev1 implements ICache {
    private cache: Map<string, any> = new Map<string, any>();
    get<T>(key: string): T | undefined {
        return this.cache.get(key) as T | undefined;
    }

    set<T>(key: string, value: T): void {
        this.cache.set(key, value);
    }

    remove(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }
}
