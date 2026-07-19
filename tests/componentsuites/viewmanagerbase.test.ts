import {
    describe,
    it,
    expect
} from "bun:test";

import {
    ViewManagerBase
} from "../../src/ViewManagerBase";


class TestViewModel extends ViewManagerBase {


    async getUsers(){

        return this.cachedFetch(
            "users",
            async()=>[
                {
                    id:1,
                    name:"John"
                }
            ]
        );

    }


    async fail(){

        return this.cachedFetch(
            "fail",
            async()=>{

                throw new Error(
                    "Network error"
                );

            }
        );

    }

}



describe("ViewManagerBase",()=>{


    it("returns VM name",()=>{

        const vm =
            new TestViewModel();


        expect(vm.name)
            .toBe(
                "TestViewModel"
            );

    });



    it("fetches data",async()=>{


        const vm =
            new TestViewModel();


        const result =
            await vm.getUsers();


        expect(result.isSuccess())
            .toBe(true);


        expect(result.getData())
            .toEqual([
                {
                    id:1,
                    name:"John"
                }
            ]);

    });



    it("handles failed fetch",async()=>{


        const vm =
            new TestViewModel();


        const result =
            await vm.fail();


        expect(result.isFailure())
            .toBe(true);


    });

});