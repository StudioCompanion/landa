<script>
	import { onMount } from 'svelte';
	import Flicker from '../components/Flicker.svelte';
	export let data;
	import Cookies from 'js-cookie';
	import ProjectSummary from '../components/ProjectSummary.svelte';
	import { imageBuilder } from '$lib/sanity';
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
	<section id="projects">
		{#each data.projects as project, index}
			<ProjectSummary {project} {index} homepage />
		{/each}
	</section>

	<style>
		#projects {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;

			padding-top: 5rem;
			margin: 0 auto;
		}

		@media screen and (min-width: 768px) {
			#projects {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		@media screen and (min-width: 1024px) {
			#projects {
				grid-template-columns: repeat(4, 1fr);
			}
		}
	</style>
{/if}
