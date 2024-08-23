<script>
	import inView from '$lib/inView';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import InlineContent from './InlineContent.svelte';
	import { Image } from "@unpic/svelte";
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let imageLoaded = false;
	let visible = false;
	let videoElement;
	let muxPlayerLoaded = false;
	let staticVideoUrl = '';

	export let project;

	function handleImageLoad() {
		imageLoaded = true;
	}

	onMount(async () => {
		// Construct the static MP4 URL
		if (project?.homepage_video?.metadata?.playbackId) {
			const playbackId = project.homepage_video.metadata.playbackId;
			staticVideoUrl = `https://stream.mux.com/${playbackId}/high.mp4`;
			console.log("Static MP4 Video URL:", staticVideoUrl);
		} else {
			console.log("No valid playback ID available for the video");
		}
	});

	// Handle mouseenter and mouseleave for video playback
	function handleVideoMouseEnter(event) {
		const videoElement = event.currentTarget.querySelector('video');
		if (videoElement) {
			// Ensure video is muted for Safari's autoplay restrictions
			videoElement.muted = true;

			// Attempt to play the video and handle potential promise rejection
			videoElement.play().catch(error => {
				console.error('Video playback failed:', error);
			});
		}
	}

	function handleVideoMouseLeave(event) {
		// Ensure the related target (new hovered element) is outside the project-summary
		if (!event.currentTarget.contains(event.relatedTarget)) {
			const videoElement = event.currentTarget.querySelector('video');
			if (videoElement) {
				videoElement.pause();
				videoElement.currentTime = 0;  // Reset video to the start
				videoElement.load();
			}
		}
	}
	let imageStackElement;
	let numImages = 0;

	$: numImages = imageStackElement ? imageStackElement.children.length : 0;
	$: gridTemplateColumns = `repeat(${numImages}, 1fr)`;

</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container"
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
	filter: blur(${visible ? '0px' : '2px'});
	transform: translateY(${visible ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.0 }}
	on:enter={() => {
		visible = true;
	}}
>
	{#if project.homepage_video && staticVideoUrl}
		<a class="project-summary" 
			href={`/work/${project.slug}`}
			on:mouseenter={handleVideoMouseEnter} 
			on:mouseleave={handleVideoMouseLeave}
		>
			<div class="video" style={`aspect-ratio: ${project.homepage_video.metadata.data.aspect_ratio.replace(':', '/')};`}>
				<video
					muted
					loop
					playsinline
					poster={project.video_thumbnail.url}
					src={staticVideoUrl}
					style={`aspect-ratio: ${project.homepage_video.metadata.data.aspect_ratio.replace(':', '/')};`}
				>
				</video>
			</div>
			<div class="project-description" id="caption">
				<span class="project-title">{project.title}</span>:
				<InlineContent value={project.caption} />
			</div>
		</a>
	{/if}

	{#if project.image_stack && !project.homepage_image && !project.homepage_video}
		<a class="project-summary" href={`/work/${project.slug}`}>
			<div class="image-stack" bind:this={imageStackElement}>
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
						sizes="(max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 960px) 960px, (max-width: 1080px) 1080px, (max-width: 1280px) 1280px, (max-width: 1668px) 1668px, (max-width: 1920px) 1920px, (max-width: 2048px) 2048px, (max-width: 2560px) 2560px, (max-width: 3200px) 3200px, (max-width: 3840px) 3840px, (max-width: 4480px) 4480px, (max-width: 5120px) 5120px, (max-width: 6016px) 6016px, 100vw"
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
		<a class="project-summary" href={`/work/${project.slug}`}>
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

	.project-image-container, .image-stack {
		overflow: hidden; 
		display: flex; 
		justify-content: left; 
		align-items: flex-start;
		width: 100%;
		max-width: 100%;
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
		align-items: center;		
		display: flex;
		gap: var(--quarter-space);
		max-width: var(--mobile-width-max);
	}

	.stack-container {
		max-height: var(--mobile-height-max);
		width: auto;
		height: auto; /* Maintain aspect ratio */
		justify-content: flex-start;
		align-items: center;
	}

	:global(.stack-image) {
		object-fit: cover !important;
		object-position: left;
		max-width: 100% !important;
		max-height: var(--mobile-height-max) !important;
		height: auto; /* Ensure the image respects the container's height */
		width: auto !important; /* Ensure the image respects the container's width */
	}

	@media (max-width: 800px) {
		.image-stack {
			grid-template-columns: repeat(1, 1fr);
		}

		.stack-container, :global(.stack-image) {
			max-height: var(--mobile-height-max) !important;
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

		.stack-container, :global(.stack-image) {
			max-height: var(--tablet-height-max) !important;
		}

		.image-stack {
			max-width: calc(var(--tablet-width-max) - var(--half-space));
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {

		.stack-container, :global(.stack-image) {
			max-height: var(--desktop-height-max) !important;
		}

		:global(.flicker-image) {
			max-height: var(--desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {

		.stack-container, :global(.stack-image) {
			max-height: var(--large-desktop-height-max) !important;
		}

		:global(.flicker-image) {
			max-height: var(--large-desktop-height-max) !important;
		}
		.image-stack {
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {

		.stack-container, :global(.stack-image) {
			max-height: var(--giant-desktop-height-max) !important;
		}

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
		display: inline-flex;
		height: 100%;
		max-height: var(--mobile-height-max) !important;
		max-width: var(--mobile-width-max);
	}

	.video video {
		max-width: 100%;
		/* border: 5px solid yellow; */
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
