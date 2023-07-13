<script lang="ts">
	import { imageBuilder } from '$lib/sanity';
	import ProjectSummary from '../../components/ProjectSummary.svelte';
	export let data;
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>{data.settings.seo_title}</title>
	<meta name="description" content={data.settings.seo_description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={data.settings.canonical_url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.settings.seo_title} />
	<meta property="og:description" content={data.settings.seo_description} />
	<meta
		property="og:image"
		content={imageBuilder.image(data.settings.seo_image).width(1600).height(900).fit('fill').url()}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={data.settings.canonical_url} />
	<meta property="twitter:url" content={data.settings.canonical_url} />
	<meta name="twitter:title" content={data.settings.seo_title} />
	<meta name="twitter:description" content={data.settings.seo_description} />
	<meta
		name="twitter:image"
		content={imageBuilder.image(data.settings.seo_image).width(1600).height(900).fit('fill').url()}
	/>
</svelte:head>

<section id="projects">
	{#each data.projects as project, index}
		<ProjectSummary {project} {index} />
	{/each}
</section>

<style>
	#projects {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 3rem;
		align-items: center;

		padding-top: 5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		margin: 0 auto;
		padding-bottom: 10rem;
	}

	@media screen and (min-width: 1024px) {
		#projects {
			grid-template-columns: repeat(2, 1fr);
			padding-left: 3rem;
			padding-right: 3rem;
		}
	}

	@media screen and (min-width: 1500px) {
		#projects {
			grid-template-columns: repeat(3, 1fr);
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
