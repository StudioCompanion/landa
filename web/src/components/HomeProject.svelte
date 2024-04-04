<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import InlineContent from './InlineContent.svelte';
	import { Image } from "@unpic/svelte";
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	let imageLoaded = false;

	function handleImageLoad() {
		imageLoaded = true;
	}

	export let project;
	export let index;
	export let homepage = false;

	let videoElement;
    let muxPlayerLoaded = false;

	onMount(async () => {
		await import('@mux/mux-player');
		await import('@mux/mux-video');
		muxPlayerLoaded = true;

		if (muxPlayerLoaded && videoElement) {
            dispatch('videoElement', videoElement);
        }
	});

	let videoElements = []; // Array to store video element references

    // Function to play video on mouse over
    function handleVideoMouseOver(event) {
        const projectSummary = event.currentTarget;
        const videoElement = projectSummary.querySelector('mux-video');
        videoElement.play();
    }

    // Function to pause video on mouse out
    function handleVideoMouseOut(event) {
        const projectSummary = event.currentTarget;
        const videoElement = projectSummary.querySelector('mux-video');
        videoElement.pause();
    }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container">


	
	{#if project.homepage_video}
		<a class="project-summary" 
		href={`/work/${project.slug}`}
		on:mouseover={handleVideoMouseOver} on:focus={handleVideoMouseOver} on:mouseout={handleVideoMouseOut} on:blur={handleVideoMouseOut}
		>
		
		
		

			<div
				class="video"
				style={`aspect-ratio: ${project.homepage_video.metadata.data.aspect_ratio.replace(':', '/')};`}
			>
			<media-controller
				style={`aspect-ratio: ${project.homepage_video.metadata.data.aspect_ratio.replace(':', '/')};`}
				class="inline"
			>
			<mux-video
				muted
				loop
				playsinline
				slot="media"
				stream-type="on-demand"
				playback-id={project.homepage_video.metadata.playbackId}
				poster={project.video_thumbnail.url}
			/>
				  <media-control-bar>
				  
				  </media-control-bar>
			  </media-controller>
	  </div>








				<div class="project-description" id="caption">
					<span class="project-title">{project.title}</span>:
					<InlineContent value={project.caption} />
				</div>
				</a>
	{/if}

	{#if project.image_stack && !project.homepage_image && !project.homepage_video}
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


	{#if project.homepage_image && !project.homepage_video && !project.image_stack}
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
	


	





	.image-loaded {
		display: flex;
	}

	:global(.media-image) {
		opacity: 0;
		transition: opacity 1s;
		display: block;
	}

	.image-loaded :global(.media-image){
		opacity: 1;
		transition: opacity 1s;
	}

	media-controller {
		--media-control-background: rgba(255, 255, 255, 0);
		--media-control-hover-background: rgba(255, 255, 255, 0);
		--media-font-family: var(--font-serif);
		--media-font-size: var(--font-size);
		--media-range-track-border-radius: 0px;
		--media-range-thumb-width: 0px;
		--media-range-thumb-height: 0px;
		--media-control-hover-background: rgba(255, 255, 255, 0);
		--media-primary-color: var(--white);
	}

	.is-black media-controller {
		--media-primary-color: var(--black);
	}
	

	media-play-button svg, media-mute-button svg, media-fullscreen-button svg {
		opacity: 1;
	}

	media-play-button:hover svg, media-mute-button:hover svg, media-fullscreen-button:hover svg{
		opacity: 0.5;
	}

	.inline media-fullscreen-button {
		right: 0;
		position: absolute;
	}
	

	.carousel {
		/* background: yellow; */
	}

	div {
		width: 100%;
	}

	media-control-bar {
		width: 100%;
	}

	
	.image, .video {
		display: inline-block;
		max-width: 100%; /* Ensures the container does not exceed the width of its parent */
	}

	.image {
		display: grid !important;
		/* background: yellow; */
	}

    .video, .image {
        max-width: 100%; /* Ensures the container does not exceed the width of its parent */
        display: flex; /* Makes the video/image container a flex container */
        justify-content: flex-start; /* Centers the video/image horizontally */
		max-height: var(--mobile-height-max) !important; /* Caps the maximum height */
		/* border: 1px red solid; */
		max-width: var(--mobile-width-max);
	}

	:global(.media-image){
		width: auto !important;
	}

    .video .mux-player, .image img, :global(.media-image) {
        max-width: 100% !important; /* Ensures the content does not exceed the width of its container */
        max-height: var(--mobile-height-max) !important; /* Caps the maximum height */
        object-fit: contain; /* Ensures the content fits within the container without losing its aspect ratio */
        width: auto; /* Allows the content to scale its width in proportion to its height */
        height: auto; /* Allows the content to scale its height in proportion to its width */
    }

	/* Tablet */
	@media (min-width: 800px) {
		.video, .image, .image img, :global(.media-image), .video .mux-player {
			max-height: var(--tablet-height-max) !important;
			max-width: calc(var(--tablet-width-max) - var(--half-space));
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video, .image, .image img, :global(.media-image), .video .mux-player {
			max-height: var(--desktop-height-max) !important;
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video, .image, .image img, :global(.media-image), .video .mux-player {
			max-height: var(--large-desktop-height-max) !important;
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));

		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video, .image, .image img, :global(.media-image), .video .mux-player {
			max-height: var(--giant-desktop-height-max) !important;
			max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
		}
	}

	.mux-player {
		height: 100%;
		width: 100%;
	}

	.mux-player.no-controls {
		--controls: none;
	}
</style>
