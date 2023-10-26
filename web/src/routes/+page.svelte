<script>
	import { onMount } from 'svelte';
	import Flicker from '../components/Flicker.svelte';
	export let data;
	import Cookies from 'js-cookie';
	import ProjectSummaryList from '../components/ProjectSummaryList.svelte';
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
	<div class="bioContainer">
		<div class="bio">
			<Content value={data.homepage.bio} />
		</div>
	</div>
	<ProjectSummaryList projects={data.projects} homepage />

	<style>
		.bioContainer {
			border-bottom: 1px solid #B0B0B0;
		}

		.bio {
			font-size: var(--font-size-mob-lg);
			padding-left: 1rem;
			padding-right: 1rem;
			margin: 5.75rem auto 2.75rem auto;
			max-width: 40rem;
		}

		@media screen and (min-width: 1024px) {
			.bio {
				font-size: var(--font-size-desk-lg);
				padding-left: 1rem;
				padding-right: 1rem;
				margin: 5.75rem auto 2.75rem auto;
				max-width: 70rem;
			}
		}		

		@media screen and (min-width: 1680px) {
			.bio {
				font-size: var(--font-size-giant-lg);
				width: 100%;
				max-width: 85rem;
			}
		}
	</style>
{/if}
