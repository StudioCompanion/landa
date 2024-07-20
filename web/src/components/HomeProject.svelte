<script>
	import inView from '$lib/inView';
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
	let visible = false;

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
		console.log("Mouse over")
        const projectSummary = event.currentTarget;
        const videoElement = projectSummary.querySelector('mux-video');
        videoElement.play();
    }

    // Function to pause video on mouse out
	function handleVideoMouseOut(event) {
		console.log("Mouse out")
		// Check if the new target is outside the project-summary
		if (!event.currentTarget.contains(event.relatedTarget)) {
        const videoElement = event.currentTarget.querySelector('mux-video');
        videoElement.pause();
        videoElement.currentTime = 0; // Reset the video to the start
        videoElement.load(); // Optionally, force the video element to reload if the poster does not show up
		}
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container"
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
	filter: blur(${visible ? '0px' : '2px'});
	transform: translateY(${visible ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.09 }}
	on:enter={() => {
		visible = true;
	}}
>
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
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start; 
		gap: var(--half-space);
		width: 100%;
	}

	.project-image-container {
		overflow: hidden; 
		display: flex; 
		justify-content: left; 
		align-items: flex-start;
		width: 100%;

	}

	:global(.flicker-image) {
		max-height: var(--mobile-height-max) !important;
		height: auto; 
		width: auto; 
		max-width: 100%; 
		object-position: left;
		object-fit: contain !important;
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
		.image-stack {
			grid-template-columns: repeat(1, 1fr);
		}
		
		:global(.image-stack .stack-container img) {
			max-height: var(--mobile-height-max) !important;
			object-fit: contain !important;
			object-position: left !important;
		}

		.image-stack .stack-container:nth-of-type(n+2) {
			display: none;
		}
	}


	/* Tablet */
	@media (min-width: 800px) {
		:global(.flicker-image) {
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
		:global(.flicker-image) {
			max-height: var(--desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		:global(.flicker-image) {
			max-height: var(--large-desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		:global(.flicker-image) {
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

	div {
		width: 100%;
	}

	.video {
		display: inline-block;
		max-width: 100%; 
	}

    .video {
        max-width: 100%; 
        display: flex;
        justify-content: flex-start; 
		max-height: var(--mobile-height-max) !important;
		max-width: var(--mobile-width-max);
	}

	:global(.media-image){
		width: auto !important;
	}

    :global(.media-image) {
        max-width: 100% !important; 
        max-height: var(--mobile-height-max) !important;
        object-fit: contain;
        width: auto; 
        height: auto;
    }

	/* Tablet */
	@media (min-width: 800px) {
		.video, :global(.media-image) {
			max-height: var(--tablet-height-max) !important;
			max-width: calc(var(--tablet-width-max) - var(--half-space));
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video, :global(.media-image) {
			max-height: var(--desktop-height-max) !important;
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video, :global(.media-image) {
			max-height: var(--large-desktop-height-max) !important;
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));

		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video, :global(.media-image) {
			max-height: var(--giant-desktop-height-max) !important;
			max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
		}
	}
</style>
