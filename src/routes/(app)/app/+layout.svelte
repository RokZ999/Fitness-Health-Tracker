<script lang="ts">
    import {
        AppRail,
        AppRailAnchor,
        AppRailTile,
        AppShell,
        AppBar,
        LightSwitch,
    } from "@skeletonlabs/skeleton";
    import { applyAction, enhance } from "$app/forms";
    import { pb } from "$lib/pocketbase";
    import { currentUser } from "$lib/stores/user";
    import "iconify-icon";
    import type { PageData } from "./$types";
    import AnimatedRoute from "$lib/Components/AnimatedRoute.svelte";
    

    export let data: PageData;

    let currentTile: number = 0;

    $: currentUser.set(data.user);

</script>

{#if $currentUser}
    <AppShell>
        <svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"
				>Health & Fitness Tracker</svelte:fragment
			>
         
			<svelte:fragment slot="trail">
                {#if $currentUser}
                    <p>Welcome, {$currentUser.email}</p>
                {/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>



        <svelte:fragment slot="sidebarLeft">
        <span data-sveltekit-preload-data>
            <AppRail>
                <AppRailTile
                    bind:group={currentTile}
                    name="Home"
                    value={0}
                    title="Home"
                >
                    <AppRailAnchor href="/app">
                        <svelte:fragment slot="lead">
                            <iconify-icon icon="mdi:home"></iconify-icon>
                        </svelte:fragment>
                        <span>Home</span>
                    </AppRailAnchor>
                </AppRailTile>

                <AppRailTile
                    bind:group={currentTile}
                    name="Exercises"
                    value={1}
                    title="Exercises"
                >
                    <AppRailAnchor href="/app/exercises">
                        <svelte:fragment slot="lead">
                            <iconify-icon icon="mingcute:fitness-fill"
                            ></iconify-icon>
                        </svelte:fragment>
                        <span>Exercises</span>
                    </AppRailAnchor>
                </AppRailTile>

                <AppRailTile
                    bind:group={currentTile}
                    name="Health"
                    value={2}
                    title="Health"
                >
                    <AppRailAnchor href="/app/health">
                        <svelte:fragment slot="lead">
                            <iconify-icon icon="ion:fitness"></iconify-icon>
                        </svelte:fragment>
                        <span>Health</span>
                    </AppRailAnchor>
                </AppRailTile>

                <AppRailTile
                    bind:group={currentTile}
                    name="Meals"
                    value={3}
                    title="Meals"
                >
                    <AppRailAnchor href="/app/meals">
                        <svelte:fragment slot="lead">
                            <iconify-icon icon="mdi:food"></iconify-icon>
                        </svelte:fragment>
                        <span>Meals</span>
                    </AppRailAnchor>
                </AppRailTile>

                <svelte:fragment slot="trail">
                    <AppRailAnchor>
                        <form
                            method="POST"
                            action="/logout"
                            use:enhance={() => {
                                return async ({ result }) => {
                                    pb.authStore.clear();
                                    await applyAction(result);
                                };
                            }}
                        >
                            <button>
                                <div>
                                    <iconify-icon
                                    icon="material-symbols:logout-sharp"
                                    width="30"
                                    height="30"
                                ></iconify-icon>
                                    <p>Log out</p>
                           
                                </div>
                            </button>
                        </form>
                    </AppRailAnchor>
                </svelte:fragment>



            </AppRail>
        </span>
        </svelte:fragment>

        <AnimatedRoute>
            <svelte:fragment>
                    <slot />
            </svelte:fragment>
        </AnimatedRoute>
    </AppShell>
{:else}
    <div class="flex items-center justify-center h-screen">
        <aside class="alert variant-ghost">
            <div class="alert-message">
                <h3 class="h3">Your token expired!</h3>
                <div class="flex justify-center">
                    <button class="btn variant-filled-primary"
                        ><a href="/login">Login</a></button
                    >
                </div>
            </div>
        </aside>
    </div>
{/if}
