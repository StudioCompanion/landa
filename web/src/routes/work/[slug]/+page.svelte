<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { PortableText } from '@portabletext/svelte';
	import Content from '../../../components/Content.svelte';
	import Media from '../../../components/Media.svelte';
	import CarouselModule from '../../../components/modules/CarouselModule.svelte';
	import ContentModule from '../../../components/modules/ContentModule.svelte';
	import GridModule from '../../../components/modules/GridModule.svelte';
	import MediaModule from '../../../components/modules/MediaModule.svelte';
	import { imageBuilder } from '$lib/sanity';
	import { page } from '$app/stores';
	export let data;
	let root;

	let visible = false;
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<title>{data.project.title} | Lane & Associates</title>
	<meta name="description" content={data.settings.seo_description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={data.settings.canonical_url + '/work/' + data.slug} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${data.project.title} | Lane & Associates`} />
	<meta property="og:description" content={data.project.caption} />
	<meta
		property="og:image"
		content={imageBuilder
			.image(data.project.featured_image)
			.width(1600)
			.height(900)
			.fit('fill')
			.url()}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={data.settings.canonical_url} />
	<meta property="twitter:url" content={data.settings.canonical_url + '/work/' + data.slug} />
	<meta name="twitter:title" content={`${data.project.title} | Lane & Associates`} />
	<meta name="twitter:description" content={data.project.caption} />
	<meta
		name="twitter:image"
		content={imageBuilder
			.image(data.project.featured_image)
			.width(1600)
			.height(900)
			.fit('fill')
			.url()}
	/>
</svelte:head>
<section class="description">
	{#if data.project.description}
		<div class="project-description">
			<Content value={data.project.description} />
		</div>
	{/if}
</section>
{#if data.project.modules}
	{#each data?.project.modules as module}
		{#if module._type === 'grid_module'}
			<GridModule {module} />
		{:else if module._type === 'content_module'}
			<ContentModule {module} />
		{:else if module._type === 'carousel_module'}
			<CarouselModule {module} />
		{:else if module._type === 'media_module'}
			<MediaModule {module} />
		{/if}
	{/each}
{/if}

{#if data.project.credits}
	<section class="credits">
		<PortableText value={data.project.credits} />
	</section>
{/if}

<style>

	.description {
		width: 100%;
		margin-top: calc(var(--full-space) + 2rem);
		padding-top: var(--half-space);
		text-align: left;
		border-top: 1px solid var(--grey);
	}

	.project-description {
		margin-left: var(--half-space);
		padding: 0 var(--half-space) var(--full-space) 0;
		max-width: var(--max-text-width);
	}

	.credits {
		margin-left: var(--half-space);
		padding: 0 var(--half-space) var(--half-space) 0;
		max-width: var(--max-text-width);
	}
	
</style>
