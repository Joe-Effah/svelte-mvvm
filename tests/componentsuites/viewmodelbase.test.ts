import {
    describe,
    it,
    expect
} from "bun:test";

import {
    get
} from "svelte/store";

import {
    ViewManagerBase
} from "../../src/ViewManagerBase";


class TestViewModel extends ViewManagerBase {


    async loadUsers(){

        return this.cachedFetch(
            "users",
            async()=>[
                {
                    id:1
                }
            ]
        );

    }


    async failed(){

        return this.cachedFetch(
            "error",
            async()=>{

                throw new Error(
                    "Boom"
                );

            }
        );

    }

}



describe("ViewManagerBase",()=>{


    it("returns class name",()=>{

        const vm =
            new TestViewModel();


        expect(vm.name)
            .toBe("TestViewModel");

    });



    it("loads data successfully",async()=>{


        const vm =
            new TestViewModel();


        const result =
            await vm.loadUsers();


        expect(result.isSuccess())
            .toBe(true);


        expect(result.getData())
            .toEqual([
                {
                    id:1
                }
            ]);



    });



    it("handles failed requests",async()=>{


        const vm =
            new TestViewModel();


        const result =
            await vm.failed();



        expect(result.isFailure())
            .toBe(true);


    });


});