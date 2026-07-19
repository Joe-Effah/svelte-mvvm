import { describe, it, expect } from "bun:test";
import { get } from "svelte/store";
import { UserFeatures as UsersViewModel} from "../../sample/src/lib/features/user/usersviewmanager";


describe("Users Feature", () => {

    it("loads users and updates the users state", async () => {

        const vm = new UsersViewModel();


        await vm.loadUsers();


        expect(vm.store.value)
            .toEqual(
                {
                    count: 1
                }
            );

    });



    // it("sets loading state while fetching users", async () => {

    //     const vm = new UsersViewModel();


    //     const promise = vm.loadUsers();


    //     expect(get(vm))
    //         .toBe(true);


    //     await promise;


    //     expect(get(vm.loading))
    //         .toBe(false);

    // });



    // it("stores errors when loading users fails", async () => {

    //     const vm = new UsersViewModel({
    //         userService: {
    //             getUsers: async () => {
    //                 throw new Error("API failed");
    //             }
    //         }
    //     });


    //     await vm.loadUsers();


    //     expect(get(vm.error))
    //         .toBe("API failed");

    // });

});