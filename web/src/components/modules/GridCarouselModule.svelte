<script lang="ts">
	import inView from '$lib/inView';
	import type { Media as MediaType } from '$lib/types';
	import SlideGrid from '../SlideGrid.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';

	type GridModule = {
		_type: 'grid_module';
		columns: number;
		caption?: string;
		items: MediaType[];
	};
	export let module: GridModule;
	export let isInCarousel: boolean = false;
</script>

<section class="gridModule" id={module._type}>
	<div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr)`}>
		{#each module.items as item}
				<SlideGrid media={item} />
		{/each}
	</div>
</section>

<style>

.gridModule {
		max-width: var(--mobile-height-max);
	}

	#grid {
		width: 100%;
		display: grid;
		gap: var(--quarter-space);
		align-items: center;
	}

	.inCarousel {
        background-color: blue; /* Sets the background color to blue */
		margin: 0;
    }
</style>