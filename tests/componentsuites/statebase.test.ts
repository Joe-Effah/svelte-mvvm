import { describe, it, expect } from "bun:test";
import { get } from "svelte/store";
import { StateBase } from "../../src/StateBase";


describe("StateBase", () => {

    it("creates state with initial value", () => {

        const state = new StateBase({
            count: 1
        });

        expect(state.value.count)
            .toBe(1);

    });


    it("updates state using set", () => {

        const state =
            new StateBase({
                count: 1
            });


        state.set({
            count: 5
        });


        expect(state.value.count)
            .toBe(5);

    });


    it("updates state using update", () => {

        const state =
            new StateBase({
                count: 1
            });


        state.update(value => ({
            count: value.count + 1
        }));


        expect(state.value.count)
            .toBe(2);

    });


    it("notifies subscribers", () => {

        const state =
            new StateBase({
                count: 0
            });


        let received = 0;


        const unsubscribe =
            state.subscribe(value => {
                received = value.count;
            });


        state.set({
            count: 10
        });


        expect(received)
            .toBe(10);


        unsubscribe();

    });


    it("handles successful async loading", async () => {

        const state =
            new StateBase({
                name: ""
            });


        await state.load(async () => ({
            name:"John"
        }));


        expect(state.value.name)
            .toBe("John");


        expect(get(state.loading))
            .toBe(false);


        expect(get(state.error))
            .toBe(null);

    });


    it("handles loading errors", async () => {

        const state =
            new StateBase({
                name:""
            });


        await state.load(async () => {

            throw new Error("Failed");

        });


        expect(get(state.error))
            .toBe("Failed");


        expect(get(state.loading))
            .toBe(false);

    });

});