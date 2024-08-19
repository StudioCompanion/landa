<script lang="ts">
		import inView from '$lib/inView';

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
	
	console.log(data);

	let visible = false;
</script>

<svelte:head>
	<!-- HTML Meta Tags -->

	<title>{data.project.seo_title} | Lane & Associates</title>
	<meta name="description" content={data.project.seo_description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={data.settings.canonical_url + 'work/' + data.slug} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${data.project.seo_title} | Lane & Associates`} />
	<meta property="og:description" content={data.project.seo_description} />
	
	<meta
		property="og:image"
		content={imageBuilder
			.image(data.project.seo_image)
			.width(1600)
			.height(900)
			.fit('fill')
			.url()}
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={data.settings.canonical_url} />
	<meta property="twitter:url" content={data.settings.canonical_url + 'work/' + data.slug} />
	<meta name="twitter:title" content={`${data.project.seo_title} | Lane & Associates`} />
	<meta name="twitter:description" content={data.project.seo_description} />
	<meta
		name="twitter:image"
		content={imageBuilder
			.image(data.project.seo_image)
			.width(1600)
			.height(900)
			.fit('fill')
			.url()}
	/>
</svelte:head>


<section class="description"
style={`opacity: ${visible ? 1 : 0}; 
transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
filter: blur(${visible ? '0px' : '2px'});`}
use:inView={{ threshold: 0.3 }}
on:enter={() => {
	visible = true;
}}
>
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
	<section class="credits"
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
	filter: blur(${visible ? '0px' : '2px'});
	transform: translateY(${visible ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.3 }}
	on:enter={() => {
		visible = true;
	}}>
		<PortableText value={data.project.credits} />
	</section>
{/if}

<style>

	.vertical-line {
		width: 1px; 
		height: 100%;
		position: fixed;
		margin-left: calc(100% - var(--half-space));
		border-left: 1px dashed blue;
	}

	.horizontal-line {
		width: 100%; 
		height: 1px;
		position: fixed;
		border-top: 1px dashed red;
	}

	/* Tablet */
	@media (min-width: 800px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: calc(100% - var(--half-space));
			border-left: 1px dashed blue;
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1197px;
			border-left: 1px dashed blue;
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1476px;
			border-left: 1px dashed blue;
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1791px;
			border-left: 1px dashed blue;
		}
	}

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
