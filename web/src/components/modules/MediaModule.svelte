<script lang="ts">
	import inView from '$lib/inView';
	import type { Media as MediaType } from '$lib/types';
	import Media from '../Media.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';

	type MediaModule = {
		_type: 'media_module';
		caption?: string;
		media: MediaType;
	};
	export let module: MediaModule;
	let visible = false;
</script>

<section class={module._type} id={module._type}>
	<div class="parentContainer">
		<Media media={module.media} />
	</div>
	{#if module.caption}
		<ModuleCaption caption={module.caption} />
	{/if}
</section>

<style>
	section {
		margin: 0 var(--half-space);
		padding: 0 0 var(--full-space) 0;
		/* max-width: var(--max-text-width); */
	}

	.parentContainer {
        display: flex; /* or 'block', depending on your layout needs */
        flex-direction: column; /* Adjusts the direction of the flex items if using flex */
        align-items: center; /* Centers the child elements horizontally */
        justify-content: center; /* Centers the child elements vertically */
    }
</style>
