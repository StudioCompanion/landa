<script lang="ts">
	import inView from '$lib/inView';
	import { onDestroy, onMount } from 'svelte';
	import { PortableText } from '@portabletext/svelte';
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

	let visible = false;

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
<section class="description">
	{#if data.project.title}
		<h1 class="project-title">{data.project.title}</h1>
	{/if}
	{#if data.project.description}
		<div class="project-description">
			<Content value={data.project.description} />
		</div>
	{/if}
	{#if data.project.tags}
		<div class="tags">
			{#each data.project.tags as tag, index}
				{#if tag.name}
					<a href={`/tag/${tag.slug}`}>
						{`${tag.name}${index < data.project.tags.length - 1 ? ', ' : ''}`}
					</a>
				{/if}
			{/each}
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
		{:else if module._type === 'quote_module'}
			<QuoteModule {module} />
		{/if}
	{/each}
{/if}

{#if data.project.credits}
	<section class="credits"
	style={`opacity: ${visible ? 1 : 0}; 
		transition: opacity .6s ease-in-out, transform .4s ease-in-out;
		transform: translateY(${visible ? '0px' : '55px'});`}
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			visible = true;
		}}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
	>
		<p>Project credits:</p>
		<PortableText value={data.project.credits} />
	</section>
{/if}

<style>
	h1 {
		font-size: 3rem;
		text-align: center;
	}
	section {
		max-width: var(--max-width);
		margin: var(--section-margin-m) auto;
		padding: 0 var(--section-padding-m);
	}

	@media screen and (min-width: 1024px) {
		section {
			margin: var(--section-margin-d) auto;
		}
	}

	section#hero {
		margin-top: 0;
		padding: 0;
	}

	section#hero {
		max-width: 100vw;

		overflow: hidden;
	}

	.credits {
		font-family: var(--font-serif);
		font-size: var(--font-size-m-m);
		text-align: center;
	}

	@media screen and (min-width: 1024px) {
		.credits {
			font-family: var(--font-serif);
			font-size: var(--font-size-m-d);
		}
	}

	.credits > p {
		margin: 0;
	}

	.tags {
		text-align: center;
		font-size: var(--font-size-s-m);
	}

	@media screen and (min-width: 1024px) {
		.tags {
			font-size: var(--font-size-s-d);
		}
	}

	.tags a {
		color: var(--dark-grey);
		text-decoration: none;
		transition: color 0.25s ease-in-out;
	}

	.tags a:hover {
		color: var(--red);
	}

	.description {
		max-width: 35rem;
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	.project-title {
		margin-block-start: 0px;
		margin-block-end: 0px;
		margin: 0px;
		font-family: var(--font-serif-bold);
		font-size: var(--font-size-m-m);
	}

	.project-description {
		font-family: var(--font-serif);
		font-size: var(--font-size-m-m);
	}

	@media screen and (min-width: 1024px) {
		.project-title, .project-description {
			font-size: var(--font-size-m-d);
		}

		.description {
			gap: 0.75rem;
			max-width: 50rem;
		}
	}
</style>
