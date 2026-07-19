<script lang="ts">
  import { UserFeatures } from "$lib/features/user/usersviewmanager";

    let userVm = new UserFeatures();


    let page = $state({
        user: userVm.store.value
    });

    userVm.store.subscribe((c)=>{
    page.user  = c
    });

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>{page.user.count}</p>

<button onclick={()=>userVm.increment()}>Click Me</button>