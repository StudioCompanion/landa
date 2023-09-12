<script lang="ts">
	import inView from '$lib/inView';
	import type { Media as MediaType } from '$lib/types';
	import Media from '../Media.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';

	type GridModule = {
		_type: 'grid_module';
		columns: number;
		caption?: string;
		items: MediaType[];
	};
	export let module: GridModule;
	let visible = false;
</script>

<section
	style={`opacity: ${visible ? 1 : 0}; transition: all .5s ease-out;`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
	id={module._type}
>
	<div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr)`}>
		{#each module.items as item}
			<div>
				<Media media={item} />
			</div>
		{/each}
	</div>
	{#if module.caption}
		<ModuleCaption caption={module.caption} />
	{/if}
</section>

<style>
	#grid {
		width: 100%;
		display: grid;
		gap: 2rem;
		align-items: center;
	}
	section {
		max-width: var(--max-width);
		margin: var(--section-margin-d) auto;
		padding: 0 var(--section-padding);
	}
</style>
