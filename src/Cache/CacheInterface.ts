 /**
  * Defines a cache provider used by ViewModels.
  *
  * Cache implementations can store and retrieve
  * temporary application data.
  *
  * @example
  * ```ts
  * const users = cache.get<User[]>("users");
  *
  * if (!users) {
  *     cache.set("users", []);
  * }
  * ```
  */
interface CacheInterface {


    /**
     * Retrieves an item from the cache.
     *
     * @typeParam T The expected cached value type.
     *
     * @param key Unique cache identifier.
     *
     * @returns The cached value or `undefined`
     * when the key does not exist.
     */
    get<T>(
        key:string
    ): T | undefined;



    /**
     * Stores an item in the cache.
     *
     * @typeParam T The cached value type.
     *
     * @param key Unique cache identifier.
     *
     * @param value Value to store.
     */
    set<T>(
        key:string,
        value:T
    ):void;



    /**
     * Removes a cached item.
     *
     * @param key Unique cache identifier.
     */
    remove(
        key:string
    ):void;



    /**
     * Removes all cached items.
     */
    clear():void;

}


export type {
    CacheInterface as ICache
};