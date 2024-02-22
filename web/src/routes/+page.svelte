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
			--content-p-max-width: 40rem;
		}

		.bioContainer {
			border-bottom: 1px solid #B0B0B0;
		}

		.bio {
			font-size: var(--font-size-mob-lg);
			margin: 4.75rem auto 1.75rem auto;
			padding: 0px 16px;
		}

		.bio .content {
			margin: 0 auto;
			text-align: center;
		}

		@media screen and (min-width: 1024px) {
			.bio {
				font-size: var(--font-size);
				margin: 6.75rem auto 2.75rem auto;
				padding: 0px 32px;
			}
			:root {
				--content-p-max-width: 60rem;
			}
		}		

		@media screen and (min-width: 1680px) {
			.bio {
				font-size: var(--font-size-giant-lg);
				width: 100%;
				margin: 7.75rem auto 3.5rem auto;
			}
			:root {
				--content-p-max-width: 80rem;
			}
		}
	</style>
{/if}
