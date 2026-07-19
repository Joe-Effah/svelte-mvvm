import {
    writable,
    get,
    type Subscriber,
    type Unsubscriber,
    type Writable
} from "svelte/store";

import type {
    IBindable
} from "./bindable";


/**
 * Reactive state container for MVVM ViewModels.
 *
 * StateBase provides a Svelte-compatible observable state
 * with loading and error tracking.
 *
 * @example
 * ```ts
 * const user = new StateBase({
 *   name: "John"
 * });
 *
 * user.set({
 *   name:"Jane"
 * });
 * ```
 */
export class StateBase<T> implements IBindable<T> {


    /**
     * Indicates whether an async operation is running.
     */
    public readonly loading: Writable<boolean> =
        writable(false);


    /**
     * Contains the latest operation error.
     */
    public readonly error: Writable<string | null> =
        writable(null);


    private readonly state: Writable<T>;


    /**
     * Creates a new state container.
     *
     * @param initial Initial state value.
     */
    constructor(
        initial: T
    ) {

        this.state =
            writable<T>(initial);

    }


    /**
     * Current state value.
     */
    public get value(): T {

        return get(this.state);

    }


    /**
     * Subscribe to state changes.
     */
    public subscribe(
        run: Subscriber<T>
    ): Unsubscriber {

        return this.state.subscribe(run);

    }


    /**
     * Replace the current state.
     */
    public set(
        value:T
    ): void {

        this.state.set(value);

    }


    /**
     * Update the current state.
     */
    public update(
        fn:(value:T)=>T
    ): void {

        this.state.update(fn);

    }


    /**
     * Load async data and update the state.
     *
     * Loading and errors are automatically handled.
     */
    public async load(
        fn:()=>Promise<T>
    ): Promise<void> {


        this.loading.set(true);
        this.error.set(null);


        try {

            const result =
                await fn();


            this.state.set(result);


        } catch(error) {


            const message =
                error instanceof Error
                    ? error.message
                    : String(error);


            this.error.set(message);


        } finally {


            this.loading.set(false);

        }

    }

}