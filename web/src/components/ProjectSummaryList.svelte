<script>
	import ProjectSummary from './ProjectSummary.svelte';

	export let projects;
	export let homepage = false;

	import { page } from '$app/stores';

</script>

<div class:work-route={$page.route.id === '/work'} class:project-summary-list={$page.route.id === '/'}>
	{#each projects as project, index}
		<ProjectSummary {project} {index} {homepage} />
	{/each}
</div>

<!-- Note for @Maciej, this might not be the best way of doing it, but I find that the /work route and the / (root) being the same a little bit tricky. -->
<!-- Particularly as it also seems to cause an issue with the transition, as the CSS changes instantly so you see a flash of the old layout before it transitions out and back in.  -->

<style>

	.work-route {
		display: grid;
		grid-template-columns: repeat(2, 1fr); /* Default to 1 column */
		margin-top: 70px;
		overflow-x: hidden;
		margin-bottom: -1px;
	}

	@media (min-width: 800px) {
		.work-route {
			margin-top: 70px;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.work-route {
			margin-top: 70px;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1700px) {
		.work-route {
			margin-top: 70px;
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 2500px) {
		.work-route {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
