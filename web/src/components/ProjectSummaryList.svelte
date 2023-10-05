<script>
	import ProjectSummary from './ProjectSummary.svelte';

	export let projects;
	export let homepage = false;

	import { page } from '$app/stores';

</script>

<div class:work-route={$page.route.id === '/work'} class="project-summary-list">
	{#each projects as project, index}
		<ProjectSummary {project} {index} {homepage} />
	{/each}
</div>

<!-- Note for @Maciej, this might not be the best way of doing it, but I find that the /work route and the / (root) being the same a little bit tricky. -->
<!-- Particularly as it also seems to cause an issue with the transition, as the CSS changes instantly so you see a flash of the old layout before it transitions out and back in.  -->

<style>
	.project-summary-list {
		align-items: center;
		display: grid;
		gap: 3rem;
		grid-template-columns: repeat(1, 1fr);
		margin: 0 auto;
		padding: 0rem 3rem 7rem 3rem;
		/* background: orange; */
	}

	.work-route {
		padding: 7rem 3rem 7rem 3rem;
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (min-width: 768px) {
		.project-summary-list {
			grid-template-columns: repeat(2, 1fr);
			padding: 0rem 3rem 7rem 3rem;
			gap: 2rem;
		}
		.work-route {
			padding: 7rem 4rem 7rem 4rem;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1024px) {
		.project-summary-list {
			grid-template-columns: repeat(2, 1fr);
			padding: 0rem 6rem 7rem 6rem;
			gap: 4rem;
		}
		.work-route {
			padding: 7rem 4rem 7rem 4rem;
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media screen and (min-width: 1920px) {
		.project-summary-list {
			padding: 0 6rem 7rem 6rem;
			grid-template-columns: repeat(2, 1fr);
		}
		.work-route {
			padding: 7rem 4rem 7rem 4rem;
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
