<script>
	import ProjectFull from './ProjectFull.svelte';

	export let projects;
	export let homepage = false;

	import { page } from '$app/stores';

</script>

<div class:work-route={$page.route.id === '/work'} class:project-summary-list={$page.route.id === '/'}>
	{#each projects as project, index}
		<ProjectFull {project} {index} {homepage} />
	{/each}
</div>

<!-- Note for @Maciej, this might not be the best way of doing it, but I find that the /work route and the / (root) being the same a little bit tricky. -->
<!-- Particularly as it also seems to cause an issue with the transition, as the CSS changes instantly so you see a flash of the old layout before it transitions out and back in.  -->

<style>

	.work-route {
		display: grid;
		grid-template-columns: repeat(2, 1fr); /* Default to 1 column */
		margin-top: 48px;
		overflow-x: hidden;
		background-color: red;
	}

	.project-summary-list {
		display: grid;
		grid-template-columns: repeat(1, 1fr); /* Default to 1 column */
	}	

	@media (min-width: 1024px) {
		.work-route {
			margin-top: 64px;
			grid-template-columns: repeat(4, 1fr);
		}

		.project-summary-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1500px) {
		.work-route {
			grid-template-columns: repeat(5, 1fr);
		}

		.project-summary-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
