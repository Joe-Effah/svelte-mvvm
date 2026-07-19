import type { Subscriber, Unsubscriber } from "svelte/store";

export interface IBindable<T = unknown> {
    readonly value: T;

    subscribe(run: Subscriber<T>): Unsubscriber;
}