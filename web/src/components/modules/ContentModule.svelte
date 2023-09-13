<script lang="ts">
	import inView from '$lib/inView';
	import Content from '../Content.svelte';

	export let module: { content: any; _type: 'content_module' };
	let visible = false;
</script>

<section
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${visible ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
	id={module._type}
	class={module._type}
>
	<Content value={module.content} />
</section>

<style>
	.content_module {
		max-width: 45rem;
		font-size: 1.25rem;
		text-align: center;
	}
	
	@media screen and (min-width: 1024px) {
		.content_module {
			max-width: 60rem;
		}
	}

	section {
		max-width: var(--max-width);
		margin: var(--section-margin-m) auto;
		padding: 0 var(--section-padding-m);
	}
	
</style>
