
import { writable, get, type Subscriber, type Unsubscriber, type Writable } from "svelte/store";
import type { IBindable } from "./bindable";

export class StateBase<T> implements IBindable<T> {
  public loading = writable(false);
  public error = writable<string | null>(null);
  private readonly initial: T;
  private state: Writable<T>;

    constructor(initial: T) {
        this.initial = initial;
        this.state = writable<T>(this.initial);
    }

    get value(): T {
        return get(this.state);
    }

    subscribe(run: Subscriber<T>): Unsubscriber {
        return this.state.subscribe(run);
    }

    set(value: T) {
        this.state.set(value);
    }

    update(fn: (value: T) => T) {
        this.state.update(fn);
    }


  // here there is an issue cause due to svelte query here s
  //  implementation may change
  /**
   * Load data from a remote source and update the store
   */
  async load(fn: () => Promise<T>) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const result = await fn();
      this.state.set(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.error.set(msg);
    } finally {
      this.loading.set(false);
    }
  }

  // Make this usable as a store with `$mystore`
}

