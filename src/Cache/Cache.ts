import type {
    ICache
} from "./CacheInterface.ts";


/**
 * Default in-memory cache implementation.
 *
 * Cachev1 stores values using JavaScript's `Map`.
 *
 * This cache:
 *
 * - lives only in memory
 * - is cleared when the application restarts
 * - is safe for temporary ViewModel data
 *
 * @example
 *
 * ```ts
 * const cache = new Cachev1();
 *
 * cache.set(
 *     "user",
 *     {
 *         id:1,
 *         name:"John"
 *     }
 * );
 *
 * const user =
 *     cache.get("user");
 * ```
 */
export class Cachev1 implements ICache {


    /**
     * Internal storage.
     */
    private readonly cache:
        Map<string, unknown> =
        new Map();



    /**
     * Retrieves a cached value.
     *
     * @typeParam T Expected value type.
     *
     * @param key Cache identifier.
     *
     * @returns Cached value or undefined.
     */
    public get<T>(
        key:string
    ):T | undefined {

        return this.cache.get(key) as T | undefined;

    }



    /**
     * Stores a value in the cache.
     *
     * @typeParam T Value type.
     *
     * @param key Cache identifier.
     *
     * @param value Value to cache.
     */
    public set<T>(
        key:string,
        value:T
    ):void {

        this.cache.set(
            key,
            value
        );

    }



    /**
     * Removes a cached value.
     *
     * @param key Cache identifier.
     */
    public remove(
        key:string
    ):void {

        this.cache.delete(
            key
        );

    }



    /**
     * Clears all cached values.
     */
    public clear():void {

        this.cache.clear();

    }

}