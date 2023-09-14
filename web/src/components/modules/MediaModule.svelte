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
<section
	style={`opacity: ${visible ? 1 : 0}; transition: all .5s ease-out;
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${visible ? '0px' : '55px'});
	`}	
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
	id={module._type}
>
	<div>
		<Media media={module.media} />
	</div>
	{#if module.caption}
		<ModuleCaption caption={module.caption} />
	{/if}
</section>

<style>
	section {
		max-width: var(--max-width);
		margin: var(--section-margin-m) auto;
		padding: 0 var(--section-padding-m);
	}
	@media screen and (min-width: 1024px) {
		section {
			margin: var(--section-margin-d) auto;
			padding: 0 var(--section-padding-d);
		}
	}
</style>
