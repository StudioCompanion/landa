<script lang="ts">
	import inView from '$lib/inView';
	import Content from '../Content.svelte';

	export let module: { content: any; _type: 'content_module' };
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
	<Content value={module.content} />
</section>

<style>
	section {
		max-width: var(--max-width);
		margin: var(--section-margin-d) auto;
		padding: 0 var(--section-padding);
	}
</style>
