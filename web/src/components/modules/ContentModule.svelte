<script lang="ts">
	import Content from '../Content.svelte';

	export let module: { content: any; _type: 'content_module' };
	let visible = false;
</script>

<section
	id={module._type}
	class={module._type}
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
