<script lang="ts">
	import type { Media as MediaType } from '$lib/types';
	import MediaGrid from '../MediaGrid.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';

	type GridModule = {
		_type: 'grid_module';
		columns: number;
		caption?: string;
		items: MediaType[];
		maxHeight?: number;
	};
	export let module: GridModule;
	export let isInCarousel: boolean = false;

	// console.log('Module maxHeight:', module.maxHeight);

</script>

<section 
class={isInCarousel ? 'gridModule inCarousel' : 'gridModule'} 
id={module._type} 
style={`${module.maxHeight ? `max-width: ${module.maxHeight}px;` : ''}`}>
<div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr);`}>
		{#each module.items as item}
			<div class="grid-item">
				<MediaGrid media={item} />
			</div>
		{/each}
	</div>
	{#if module.caption}
		<ModuleCaption caption={module.caption} />
	{/if}
</section>

<style>

	.gridModule {
		max-width: var(--mobile-width-max);
		margin: 0 var(--half-space) var(--full-space) var(--half-space);
	}

	#grid {
		width: 100%;
		display: grid;
		gap: var(--quarter-space);
		align-items: center;
	}

	.inCarousel {
		margin: 0;
    }

  /* Tablet */
	@media (min-width: 800px) {
		.gridModule {
			max-width: calc(var(--tablet-width-max) - var(--half-space));
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.gridModule {
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.gridModule {
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.gridModule {
			max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
		}
	}

</style>