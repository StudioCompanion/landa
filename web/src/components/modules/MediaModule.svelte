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

<section 
class={module._type} 
id={module._type}
style={`opacity: ${visible ? 1 : 0}; 
transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
filter: blur(${visible ? '0px' : '2px'});
transform: translateY(${visible ? '0px' : '55px'});`}
use:inView={{ threshold: 0.3 }}
on:enter={() => {
	visible = true;
}}
>
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
        align-items: start; /* Centers the child elements horizontally */
        justify-content: start; /* Centers the child elements vertically */
    }
</style>
