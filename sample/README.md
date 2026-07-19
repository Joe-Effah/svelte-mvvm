## Why Svelte MVVM?

As Svelte applications grow, it's common for the `<script>` block to become responsible for everything:

- Fetching data
- Business logic
- Validation
- State management
- API calls
- Event handling
- Navigation

This quickly becomes difficult to maintain and even harder to test.

Svelte MVVM encourages moving that logic into **ViewModels**, leaving your components focused on rendering the UI.

---

## Before

```svelte
<script lang="ts">
    import { UserService } from "$lib/api";

    let users = $state([]);
    let loading = $state(false);
    let error = $state("");

    async function loadUsers() {
        loading = true;

        try {
            users = await UserService.getUsers();
        } catch (e) {
            error = "Failed to load users";
        } finally {
            loading = false;
        }
    }

    function deleteUser(id: number) {
        ...
    }

    function searchUsers(value: string) {
        ...
    }

    function exportUsers() {
        ...
    }

    onMount(loadUsers);
</script>
```

As more features are added, the component grows into hundreds of lines of code.

---

## After

Move all of that logic into a ViewModel.

```
src/
└── features/
    └── users/
        ├── UsersViewManager.ts
```

Your component becomes simple.

```svelte
<script lang="ts">
    import { UsersViewManager } from "./UsersViewManager";

    const vm = new UsersViewManager();

    let page = $state({
        users: vm.users.value
    });

    vm.users.subscribe(users => {
        page.users = users;
    });
</script>

{#each page.users as user}
    <p>{user.name}</p>
{/each}
```

All business logic now lives inside the ViewModel.

```ts
export class UsersViewManager extends ViewManagerBase {

    users = new StateBase<User[]>([]);

    loadUsers = async () => {
        ...
    };

    deleteUser = async (id: number) => {
        ...
    };

    search = (text: string) => {
        ...
    };

    export = () => {
        ...
    };
}
```

---

## Benefits

✔ Keep Svelte components small and readable.

✔ Separate UI from business logic.

✔ Organize code by feature instead of by file type.

✔ Make ViewModels easy to unit test.

✔ Reuse the same ViewModel across multiple components.

✔ Take advantage of Svelte 5's `$state` without replacing its reactive model.

---


Each feature owns its ViewModel and supporting files, making large applications easier to navigate and maintain.