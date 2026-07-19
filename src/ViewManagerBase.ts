import { get, writable, type Writable } from 'svelte/store';
import type { ICache } from './Cache/CacheInterface.ts';
import { Cachev1 } from './Cache/Cache.ts';
import { ErrorSource, Result } from '@effahjoe/results';

export abstract class ViewManagerBase {
	protected cacheStore: ICache = new Cachev1();
	private loading: Writable<boolean> = writable(false);
	private error: Writable<string | null> = writable(null);
	private CacheTimeSpan: Writable<Number> = writable(1); //1 minute

	/**
	 * The name of the view manager.
	 */
	public get name(): string {
		return this.constructor.name;
	}
	protected setLoading(val: boolean) {
		this.loading.set(val);
	}

	protected setError(err: string | null) {
		this.error.set(err);
	}

	/**
	 * Fetches data with in-memory caching for a configurable TTL (minutes).
	 */
	protected async cachedFetch<T>(
		key: string,
		fn?: () => Promise<T>,
		customTTL?: number
	): Promise<Result<T, ErrorSource>> {
		const timespan = customTTL ?? get(this.CacheTimeSpan); // minutes
		const cached = await this.cacheStore.get<T>(key);

		if (cached && typeof timespan === 'number') {
			const elapsedMinutes = (Date.now() - timespan) / (1000 * 60);
			if (elapsedMinutes < timespan) {
				return Result.success<T>(cached);
			}
		}

		try {
			this.setLoading(true);
			if (!fn) {
				const errObj = ErrorSource.create('No fetch function provided', 'NO_FETCH_FUNCTION');
				this.setError(errObj.message);
				return Result.failure<ErrorSource>(errObj);
			}
			const result = await fn();

			await this.cacheStore.set(key, {
				data: result,
				timestamp: Date.now()
			});

			this.setError(null);
			return Result.success<T>(result);
		} catch (error) {
			const errObj = ErrorSource.create('Failed to fetch', 'FETCH_ERROR', { error });
			this.setError(errObj.message);
			return Result.failure<ErrorSource>(errObj);
		} finally {
			this.setLoading(false);
		}
	}
}
