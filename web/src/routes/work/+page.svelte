<script lang="ts">
	import { imageBuilder } from '$lib/sanity';
	import ProjectSummaryList from '../../components/ProjectSummaryList.svelte';
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

<ProjectSummaryList projects={data.projects} />
