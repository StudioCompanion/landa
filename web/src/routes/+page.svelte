<script>
	import { onMount } from 'svelte';
	import Flicker from '../components/Flicker.svelte';
	export let data;
	import Cookies from 'js-cookie';
	import ProjectSummary from '../components/ProjectSummary.svelte';
	import { imageBuilder } from '$lib/sanity';
	import Content from '../components/Content.svelte';
	import { ClientError } from '@sanity/client';

	let loading = true;
	let show = false;
	onMount(() => {
		show = Cookies.get('splashscreen');
		loading = false;
	});
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
{#if !loading}
	{#if data.splashscreen && !show}
		<Flicker images={data.splashscreen} />
	{/if}
	<div id="bio">
		<Content value={data.homepage.bio} />
	</div>
	<section id="projects">
		{#each data.projects as project, index}
			<ProjectSummary {project} {index} homepage />
		{/each}
	</section>

	<style>
		#bio {
			padding-top: 5rem;
			padding-left: 1rem;
			padding-right: 1rem;
			max-width: 60rem;
			margin: 0 auto;
		}

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
{/if}
