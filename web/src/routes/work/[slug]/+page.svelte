<script lang="ts">
	import inView from '$lib/inView';
	import { onDestroy, onMount } from 'svelte';
	import Content from '../../../components/Content.svelte';
	import Media from '../../../components/Media.svelte';
	import CarouselModule from '../../../components/modules/CarouselModule.svelte';
	import ContentModule from '../../../components/modules/ContentModule.svelte';
	import GridModule from '../../../components/modules/GridModule.svelte';
	import QuoteModule from '../../../components/modules/QuoteModule.svelte';
	import { imageBuilder } from '$lib/sanity';
	import { page } from '$app/stores';
	export let data;
	let root;

	onMount(() => {
		root = document.querySelector(':root');
	});

	onDestroy(() => {
		root?.style.setProperty('--logo-color', 'black');
	});
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
<section
	id="hero"
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		root?.style.setProperty('--logo-color', data.project.theme === 'light' ? 'white' : 'black');
	}}
	on:exit={() => {
		root?.style.setProperty('--logo-color', 'black');
	}}
>
	<Media media={data.project.hero} />
</section>
<section id="description">
	{#if data.project.title}
		<h1>{data.project.title}</h1>
	{/if}
	{#if data.project.description}
		<Content value={data.project.description} />
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
		{:else if module._type === 'quote_module'}
			<QuoteModule {module} />
		{/if}
	{/each}
{/if}

{#if data.project.credits}
	<section id="credits">
		Project credits:<br />
		{data.project.credits}
	</section>
{/if}

<style>
	h1 {
		font-size: 3rem;
		text-align: center;
	}
	section {
		max-width: var(--max-width);
		margin: var(--section-margin) auto;
		padding: 0 var(--section-padding);
	}
	section#hero {
		margin-top: 0;
		padding: 0;
	}

	section#hero {
		max-width: 100vw;

		overflow: hidden;
	}

	section#credits {
		font-size: 1.5rem;
		text-align: center;
	}
</style>
