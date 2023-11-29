<script lang="ts">
	import "postcss"
	import { AppShell, AppBar } from "@skeletonlabs/skeleton";
	import { LightSwitch } from "@skeletonlabs/skeleton";
    import AnimatedRoute from "$lib/Components/AnimatedRoute.svelte";

</script>


<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"
				>Health & Fitness Tracker</svelte:fragment
			>
			
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
		<AnimatedRoute>
			<svelte:fragment>
					<slot />
			</svelte:fragment>
		</AnimatedRoute>
</AppShell>
