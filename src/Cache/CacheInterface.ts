

interface CacheInterface {
    /**
     * Retrieves an item from the cache.
     * @param key The key of the item to retrieve.
     * @returns The cached item or undefined if not found.
     */
    get<T>(key: string): T | undefined;

    /**
     * Sets an item in the cache.
     * @param key The key of the item to set.
     * @param value The value of the item to set.
     */
    set<T>(key: string, value: T): void;

    /**
     * Removes an item from the cache.
     * @param key The key of the item to remove.
     */
    remove(key: string): void;

    /**
     * Clears the entire cache.
     */
    clear(): void;
}
export type { CacheInterface as ICache };
