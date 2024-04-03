<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
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


	{#if project.image_stack}
	<a class="project-summary" 
	href={`/work/${project.slug}`}
	>
			<div class="image-stack">
			{#each project.image_stack as image}
			<div class="stack-container" class:image-loaded={imageLoaded}>
				<Image
					class="stack-image"
					src={image.asset.url}  
					layout="constrained"
					width={image.asset.metadata.dimensions.width}
					aspectRatio={image.asset.metadata.dimensions.aspectRatio}
					background="#FFFFFF"
					on:load={handleImageLoad}
					alt={image.asset.altText}
				/>	
			</div>

			{/each}
			</div>
	
		<div class="project-description" id="caption">
			<span class="project-title">{project.title}</span>:
			<InlineContent value={project.caption} />
		</div>
	</a>
	{/if}


	{#if project.homepage_image}
	<a class="project-summary" 
	href={`/work/${project.slug}`}
	>

		<div class="project-image-container" id="image-container">
				<div class:image-loaded={imageLoaded}>
					<Image
					class="flicker-image"
					src={project.homepage_image.asset.url}  
					layout="constrained"
					width={project.homepage_image.asset.metadata.dimensions.width}
					aspectRatio={project.homepage_image.asset.metadata.dimensions.aspectRatio}
					background="#FFFFFF"
					on:load={handleImageLoad}
					alt={project.homepage_image.asset.altText}
						/>	
				</div>
		</div>

		<div class="project-description" id="caption">
			<span class="project-title">{project.title}</span>:
			<InlineContent value={project.caption} />
		</div>
	</a>
	{/if}





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
		width: 100%;

	}

	.project-image-container {
		overflow: hidden; /* Keeps existing overflow behavior */
		display: flex; /* Keeps the flex display */
		justify-content: left; /* Aligns the image to the left, can be 'flex-start' for consistency */
		align-items: flex-start; /* Aligns the image to the top */
		width: 100%;

	}

	.project-image-container img, :global(.flicker-image) {
		max-height: var(--mobile-height-max) !important; /* Maximum height for the image */
		height: auto; /* Ensures height adjusts based on width while maintaining aspect ratio */
		width: auto; /* Ensures width adjusts to maintain the image's aspect ratio */
		max-width: 100%; /* Ensures image does not exceed the width of its container */
		object-position: left;
		object-fit: contain !important;
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

	.flicker-image-container {
		display: none;
	}

	.flicker-image-container :global(.flicker-image) {
		background: red !important;
	}

	.flicker-visible {
		display: flex;
	}

	.project-description {
		max-width: var(--content-p-max-width);
		font-size: var(--font-size);
		line-height: var(--line-height);
	}

	.project-title {
		color: var(--black);
	}

	a {
		text-decoration: none;
	}

	a:hover .project-title {
		color: var(--red);
	}

	.image-stack {
		width: 100%;
		display: grid;
		align-items: center;		
		grid-template-columns: repeat(3, 1fr);
		gap: var(--quarter-space);
		max-width: var(--mobile-width-max);
	}

	@media (max-width: 800px) {
		.image-stack .stack-container:nth-of-type(n+2) {
			display: none;
		}
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

		.image-stack {
			max-width: calc(var(--tablet-width-max) - var(--half-space));
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--large-desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.project-image-container img, :global(.flicker-image), .image-stack img {
			max-height: var(--giant-desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
		}
	}
	
</style>
