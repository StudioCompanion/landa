<script>
	import { onMount } from 'svelte';
	import Flicker from '../components/Flicker.svelte';
	export let data;
	import Cookies from 'js-cookie';
	import HomeProjectList from '../components/HomeProjectList.svelte';
	import { imageBuilder } from '$lib/sanity';
	import Content from '../components/Content.svelte';
	import { ClientError } from '@sanity/client';
	import { redirect } from '@sveltejs/kit';

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

	<HomeProjectList projects={data.projects} homepage />

	<style>

		:root {
			--content-p-max-width: 82.8rem;
		}

		.bioContainer {
			margin: var(--half-space);
		}

		.bio {
			width: 90%;
			text-indent: 163px;
			line-height: var(--line-height);
			font-size: var(--font-size);
			color: var(--light-grey);
		}

		@media (min-width: 800px) {
			.bio {
				width: 80%;
				text-indent: 163px;
			}
		}

		.bio .content {
			text-align: left;
		}
	</style>
{/if}
