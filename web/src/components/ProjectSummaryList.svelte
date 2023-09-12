<script>
	import ProjectSummary from './ProjectSummary.svelte';

	export let projects;
	export let homepage = false;
</script>

<div class="project-summary-list">
	{#each projects as project, index}
		<ProjectSummary {project} {index} {homepage} />
	{/each}
</div>

<style>
	.project-summary-list {
		align-items: center;
		display: grid;
		gap: 3rem;
		grid-template-columns: repeat(1, 1fr);
		margin: 0 auto;
		padding: 0rem 1rem 10rem 1rem;
	}

	@media screen and (min-width: 1024px) {
		.project-summary-list {
			grid-template-columns: repeat(2, 1fr);
			padding-left: 3rem;
			padding-right: 3rem;
		}
	}

	@media screen and (min-width: 1500px) {
		.project-summary-list {
			grid-template-columns: repeat(3, 1fr);
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
