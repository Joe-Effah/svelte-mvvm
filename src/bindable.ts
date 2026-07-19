import type {
    Subscriber,
    Unsubscriber
} from "svelte/store";


/**
 * Represents a subscribable value that can expose its current state.
 *
 * Implemented by state containers that can be consumed by Svelte components.
 */
export interface IBindable<T = unknown> {

    /**
     * Gets the current value.
     */
    readonly value: T;


    /**
     * Subscribe to value changes.
     *
     * @param run Callback invoked whenever the value changes.
     * @returns Function to unsubscribe.
     */
    subscribe(
        run: Subscriber<T>
    ): Unsubscriber;
}