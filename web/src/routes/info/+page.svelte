<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let root;

	onMount(() => {
		root = document.querySelector(':root');
		root?.style.setProperty('--logo-color', 'white');
	});

	onDestroy(() => {
		root?.style.setProperty('--logo-color', 'black');
	});
</script>

<section>All about me!</section>

<style>
	section {
		background-color: var(--red);
		min-height: 100vh;
	}
</style>
