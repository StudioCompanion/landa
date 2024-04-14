<script>
	import ProjectSummary from './ProjectSummary.svelte';

	export let projects;
	export let homepage = false;

	import { page } from '$app/stores';

</script>

<div class:work-route={$page.route.id === '/work'} class:project-summary-list={$page.route.id === '/'}>
	{#each projects as project, index}
		<ProjectSummary {project} {index} />
	{/each}
</div>

<style>

	.work-route {
		display: grid;
		grid-template-columns: repeat(2, 1fr); /* Default to 1 column */
		margin-top: 48px;
		overflow-x: hidden;
		margin-bottom: -1px;
		margin-right: -1px;
		border-top: 1px solid var(--grey);
	}

	@media (min-width: 800px) {
		.work-route {
			margin-top: calc(var(--full-space) + 2rem);
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.work-route {
			margin-top: calc(var(--full-space) + 2rem);
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1700px) {
		.work-route {
			margin-top: calc(var(--full-space) + 2rem);
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 2500px) {
		.work-route {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
