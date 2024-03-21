<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import inView from '$lib/inView';
	import InlineContent from './InlineContent.svelte';
	import { Image } from "@unpic/svelte";

	let imageLoaded = false;

	function handleImageLoad() {
		imageLoaded = true;
	}
	
	export let project;
	export let index;
	export let homepage = false;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container">
	<a class="project-summary" href={`/work/${project.slug}`}>
		{#if project.image_stack}
			<div class="image-stack">
			{#each project.image_stack as image}
			<div class:image-loaded={imageLoaded}>
				<Image
					class="stack-image"
					src={image.asset.url}  
					layout="constrained"
					width={image.asset.metadata.dimensions.width}
					aspectRatio={image.asset.metadata.dimensions.aspectRatio}
					background={image.asset.metadata.lqip}
										on:load={handleImageLoad}
					alt="ALT NAME REPLACE"
				/>	
			</div>

			{/each}
			</div>
		{/if}
		{#if project.image_flicker}
			<div class="project-image-container" id="image-container">
			{#each project.image_flicker as image}
			<div class:image-loaded={imageLoaded}>
				<Image
					class="flicker-image"
					src={image.asset.url}  
					layout="constrained"
					width={image.asset.metadata.dimensions.width}
					aspectRatio={image.asset.metadata.dimensions.aspectRatio}
					background={image.asset.metadata.lqip}	on:load={handleImageLoad}
					alt="ALT NAME REPLACE"
				/>	
			</div>
		{/each}
			</div>
		{/if}
		<div class="project-description" id="caption">
			<span class="project-title">{project.title}</span>:
			<InlineContent value={project.caption} />
		</div>
	</a>
</div>

<style>
	.project-container {
		padding: var(--half-space);
		border-top: 1px solid var(--grey);
	}

	.project-summary {
		position: relative;
		display: inline-flex; /* Changed from 'block' to 'inline-flex' */
		flex-direction: column; /* Ensures child elements (image and description) are stacked vertically */
		align-items: flex-start; /* Aligns child elements to the start, preventing unnecessary stretching */
		gap: var(--half-space);
	}

	.project-image-container {
		overflow: hidden; /* Keeps existing overflow behavior */
		display: flex; /* Keeps the flex display */
		justify-content: left; /* Aligns the image to the left, can be 'flex-start' for consistency */
		align-items: flex-start; /* Aligns the image to the top */
	}

	.project-image-container img, :global(.flicker-image) {
		max-height: var(--mobile-height-max) !important; /* Maximum height for the image */
		height: auto; /* Ensures height adjusts based on width while maintaining aspect ratio */
		width: auto; /* Ensures width adjusts to maintain the image's aspect ratio */
		max-width: 100%; /* Ensures image does not exceed the width of its container */
	}

	.project-description {
		max-width: var(--content-p-max-width);
		font-size: var(--font-size);
		line-height: var(--line-height);
	}

	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--grey);
	}

	.image-stack {
		width: 100%;
		display: grid;
		align-items: center;		
		grid-template-columns: repeat(3, 1fr);
		gap: var(--quarter-space);
	}
	
	.image-stack .stack-image {
		max-width: 100%;
		max-height: var(--desktop-height-max);
	}

	.image-loaded {
		display: flex;
	}

	:global(.flicker-image), :global(.stack-image) {
		opacity: 0;
		transition: opacity 1s;
	}

	.image-loaded :global(.flicker-image), .image-loaded :global(.stack-image){
		opacity: 1;
		transition: opacity 1s;
	}

	/* Tablet */
	@media (min-width: 800px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--tablet-height-max) !important;
		}
		.project-description {
			font-size: var(--font-size);
			line-height: var(--line-height);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--desktop-height-max) !important;
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--large-desktop-height-max) !important;
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--giant-desktop-height-max) !important;
		}
	}
	
</style>
