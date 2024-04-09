<script>
	import HomeProject from './HomeProject.svelte';

	export let projects;

	import { page } from '$app/stores';

</script>

<div class="home-index">
	{#each projects as project, index}
		<HomeProject {project}/>
	{/each}
</div>

<style>
	.home-index {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
