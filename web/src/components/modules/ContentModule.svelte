<script lang="ts">
	import inView from '$lib/inView';
	import Content from '../Content.svelte';

	export let module: { content: any; _type: 'content_module' };
	let visible = false;
</script>

<section
	id={module._type}
	class={module._type}
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
	filter: blur(${visible ? '0px' : '2px'});
	transform: translateY(${visible ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.3 }}
	on:enter={() => {
		visible = true;
	}}
>
	<Content value={module.content} />
</section>

<style>
	.content_module {
		max-width: var(--max-text-width);
		text-align: left;
	}
	
	@media screen and (min-width: 1024px) {
		.content_module {
			max-width: var(--max-text-width);
		}
	}

	section {
		max-width: var(--max-width);
		margin: 0 var(--half-space) var(--full-space) var(--half-space);
	}
	
</style>
