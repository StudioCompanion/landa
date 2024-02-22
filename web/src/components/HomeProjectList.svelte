<script>
	import HomeProject from './HomeProject.svelte';

	export let projects;
	export let homepage = false;

	import { page } from '$app/stores';

</script>

<div class="home-index">
	{#each projects as project, index}
		<HomeProject {project} {index} {homepage} />
	{/each}
</div>

<style>
	.home-index {
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}
</style>
