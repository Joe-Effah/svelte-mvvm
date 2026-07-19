import {
    writable,
    get,
    type Writable
} from "svelte/store";


import type {
    ICache
} from "./Cache/CacheInterface";


import {
    Cachev1
} from "./Cache/Cache";


import {
    ErrorSource,
    Result
} from "@effahjoe/results";


/**
 * Base class for application ViewModels.
 *
 * Provides shared functionality:
 *
 * - loading tracking
 * - error handling
 * - caching
 * - async operations
 *
 * Feature ViewModels should extend this class.
 *
 * @example
 *
 * ```ts
 * class UsersViewModel extends ViewManagerBase {
 *
 *    users = new StateBase([]);
 *
 * }
 * ```
 */
export abstract class ViewManagerBase {


    /**
     * Internal cache provider.
     */
    protected readonly cacheStore:ICache =
        new Cachev1();


    /**
     * Indicates an active operation.
     */
    protected readonly loading:Writable<boolean> =
        writable(false);


    /**
     * Current error message.
     */
    protected readonly error:Writable<string|null> =
        writable(null);


    /**
     * Cache lifetime in minutes.
     */
    protected readonly cacheTimeSpan:Writable<number> =
        writable(1);



    /**
     * Returns the ViewModel name.
     */
    public get name():string {

        return this.constructor.name;

    }



    /**
     * Update loading state.
     */
    protected setLoading(
        value:boolean
    ):void {

        this.loading.set(value);

    }



    /**
     * Update error state.
     */
    protected setError(
        value:string|null
    ):void {

        this.error.set(value);

    }



    /**
     * Fetch data with memory caching.
     *
     * @param key Cache identifier.
     * @param fn Async data provider.
     * @param customTTL Cache duration in minutes.
     */
    protected async cachedFetch<T>(
        key:string,
        fn:()=>Promise<T>,
        customTTL?:number
    ):Promise<Result<T,ErrorSource>> {


        const ttl =
            customTTL ??
            get(this.cacheTimeSpan);



       const cached =
    await this.cacheStore.get<T>(key);


// if (cached) {

//     const elapsedMinutes =
//         (
//             Date.now()
//             -
//             cached.timestamp as number
//         )
//         /
//         (1000 * 60);


//     if (elapsedMinutes < ttl) {

//         return Result.success(
//             cached
//         );

//     }

// }



        try {


            this.setLoading(true);


            const result =
                await fn();



            await this.cacheStore.set(
                key,
                {
                    data:result,
                    timestamp:Date.now()
                }
            );


            this.setError(null);


            return Result.success(
                result
            );


        } catch(error) {


            const err =
                ErrorSource.create(
                    "Failed to fetch",
                    "FETCH_ERROR",
                    {
                        error
                    }
                );


            this.setError(
                err.message
            );


            return Result.failure(
                err
            );


        } finally {


            this.setLoading(false);

        }

    }

}