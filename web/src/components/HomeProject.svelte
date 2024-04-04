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

	onMount(() => {
        function adjustVideoSize() {
            // console.log('Adjusting video size');
            const videoContainers = document.querySelectorAll('.video-container');

            videoContainers.forEach(container => {
                const player = container.querySelector('.mux-slide-player');
                if (!player) return;

                // Dynamically determine or assume the aspect ratio
                const aspectRatio = 16 / 9;

                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;
                const containerRatio = containerWidth / containerHeight;

                let playerWidth, playerHeight;

                if (containerRatio > aspectRatio) {
                    playerWidth = containerWidth;
                    playerHeight = containerWidth / aspectRatio;
                } else {
                    playerHeight = containerHeight;
                    playerWidth = containerHeight * aspectRatio;
                }

                player.style.width = `${playerWidth}px`;
                player.style.height = `${playerHeight}px`;
            });
            // console.log(`Player dimensions set to width: ${playerWidth}px, height: ${playerHeight}px`);
        }

        adjustVideoSize(); // Call initially in case the component is already the correct size

        // Add event listener for resize events
        window.addEventListener('resize', adjustVideoSize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', adjustVideoSize);
        };
    });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container">

	{#if project.homepage_video && !project.homepage_image && !project.image_stack}
	<a class="project-summary" 
	href={`/work/${project.slug}`}
	>
	<media-controller
			style={`${project.homepage_video.media_type === 'video' ? `aspect-ratio: ${project.homepage_video.metadata.data.aspect_ratio.replace(':', '/')};` : ''}`}
			class="inline"
			>
			<mux-video
				bind:this={videoElement}
				muted
				autoplay="muted"
				loop
				playsinline
				slot="media"
				stream-type="on-demand"
                playback-id={project.homepage_video.metadata.playbackId}
				poster={project.video_thumbnail.url}
			/>
				<media-control-bar>
				<media-play-button>
					<svg slot="play" width="24" height="24" viewBox="0 0 24 24" fill="auto" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_658)">
						<path d="M18.9998 12.0003C19.0002 12.1701 18.9566 12.3371 18.8734 12.485C18.7902 12.633 18.6701 12.7569 18.5248 12.8447L9.51976 18.3534C9.36793 18.4464 9.19405 18.4972 9.01605 18.5005C8.83806 18.5037 8.66242 18.4595 8.50726 18.3722C8.35357 18.2863 8.22555 18.161 8.13636 18.0091C8.04716 17.8573 8.00001 17.6845 7.99976 17.5084V6.49219C8.00001 6.31612 8.04716 6.14329 8.13636 5.99148C8.22555 5.83967 8.35357 5.71436 8.50726 5.62844C8.66242 5.54115 8.83806 5.49688 9.01605 5.50017C9.19405 5.50347 9.36793 5.55422 9.51976 5.64719L18.5248 11.1559C18.6701 11.2437 18.7902 11.3676 18.8734 11.5156C18.9566 11.6636 19.0002 11.8305 18.9998 12.0003Z" fill="auto"/>
						</g>
						<defs>
						<clipPath id="clip0_965_658">
						<rect width="16" height="16" fill="auto" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
					
					<svg slot="pause" width="24" height="24" viewBox="0 0 24 24" fill="auto" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_662)">
						<path d="M17.4996 7V17L17.4995 17.5V18H12.9996L12.9995 17.5L12.9996 17V7V6.5V6H17.4996V6.5V7ZM10.9996 6H6.49951L6.4998 6.5L6.4996 7V17L6.49951 17.5V18H10.9995V17.5L10.9996 17V7V6.5V6Z" fill="auto"/>
						</g>
						<defs>
						<clipPath id="clip0_965_662">
						<rect width="16" height="16" fill="auto" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
				</media-play-button>
				
				<media-fullscreen-button>
					<svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="auto" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_671)">
						<path d="M17.5 7V9.5C17.5001 9.59895 17.4708 9.69569 17.4159 9.77799C17.3609 9.86029 17.2828 9.92444 17.1914 9.96231C17.1 10.0002 16.9994 10.0101 16.9023 9.99076C16.8053 9.97144 16.7162 9.92376 16.6462 9.85375L14.1462 7.35375C14.0762 7.28382 14.0286 7.1947 14.0092 7.09765C13.9899 7.00061 13.9998 6.90002 14.0377 6.80861C14.0756 6.71719 14.1397 6.63908 14.222 6.58414C14.3043 6.5292 14.4011 6.49992 14.5 6.5H17C17.1326 6.5 17.2598 6.55268 17.3536 6.64645C17.4473 6.74022 17.5 6.86739 17.5 7ZM7.35375 14.1462C7.28382 14.0762 7.1947 14.0286 7.09765 14.0092C7.00061 13.9899 6.90002 13.9998 6.80861 14.0377C6.71719 14.0756 6.63908 14.1397 6.58414 14.222C6.5292 14.3043 6.49992 14.4011 6.5 14.5V17C6.5 17.1326 6.55268 17.2598 6.64645 17.3536C6.74022 17.4473 6.86739 17.5 7 17.5H9.5C9.59895 17.5001 9.69569 17.4708 9.77799 17.4159C9.86029 17.3609 9.92444 17.2828 9.96231 17.1914C10.0002 17.1 10.0101 16.9994 9.99076 16.9023C9.97144 16.8053 9.92376 16.7162 9.85375 16.6462L7.35375 14.1462ZM17.1912 14.0381C17.0999 14.0002 16.9994 13.9903 16.9023 14.0095C16.8053 14.0288 16.7162 14.0763 16.6462 14.1462L14.1462 16.6462C14.0762 16.7162 14.0286 16.8053 14.0092 16.9023C13.9899 16.9994 13.9998 17.1 14.0377 17.1914C14.0756 17.2828 14.1397 17.3609 14.222 17.4159C14.3043 17.4708 14.4011 17.5001 14.5 17.5H17C17.1326 17.5 17.2598 17.4473 17.3536 17.3536C17.4473 17.2598 17.5 17.1326 17.5 17V14.5C17.5 14.4011 17.4706 14.3044 17.4157 14.2222C17.3607 14.14 17.2826 14.076 17.1912 14.0381ZM9.5 6.5H7C6.86739 6.5 6.74022 6.55268 6.64645 6.64645C6.55268 6.74022 6.5 6.86739 6.5 7V9.5C6.49992 9.59895 6.5292 9.69569 6.58414 9.77799C6.63908 9.86029 6.71719 9.92444 6.80861 9.96231C6.90002 10.0002 7.00061 10.0101 7.09765 9.99076C7.1947 9.97144 7.28382 9.92376 7.35375 9.85375L9.85375 7.35375C9.92376 7.28382 9.97144 7.1947 9.99076 7.09765C10.0101 7.00061 10.0002 6.90002 9.96231 6.80861C9.92444 6.71719 9.86029 6.63908 9.77799 6.58414C9.69569 6.5292 9.59895 6.49992 9.5 6.5Z" fill="auto"/>
						</g>
						<defs>
						<clipPath id="clip0_965_671">
						<rect width="16" height="16" fill="auto" transform="translate(4 4)"/>
						</clipPath>
						</defs>
					</svg>												
				</media-fullscreen-button>
				</media-control-bar>
			</media-controller>
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
	



	media-controller {
		--media-control-background: rgba(255, 255, 255, 0);
		--media-control-hover-background: rgba(255, 255, 255, 0);
		--media-font-family: var(--font-serif);
		--media-primary-color: var(--white);
		--media-font-size: var(--font-size);
		--media-range-track-border-radius: 0px;
		--media-range-thumb-width: 0px;
		--media-range-thumb-height: 0px;
		--media-control-hover-background: rgba(255, 255, 255, 0);
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

    .video {
		display: inline-block;
		max-width: 100%; /* Ensures the container does not exceed the width of its parent */
	}

    .video {
        max-width: 100%; /* Ensures the container does not exceed the width of its parent */
        display: flex; /* Makes the video/image container a flex container */
        justify-content: flex-start; /* Centers the video/image horizontally */
		max-height: var(--mobile-height-max); /* Caps the maximum height */
	}

    .video .mux-player {
        max-width: 100%; /* Ensures the content does not exceed the width of its container */
        max-height: var(--mobile-height-max); /* Caps the maximum height */
        object-fit: contain; /* Ensures the content fits within the container without losing its aspect ratio */
        width: auto; /* Allows the content to scale its width in proportion to its height */
        height: auto; /* Allows the content to scale its height in proportion to its width */
    }


	/* Tablet */
	@media (min-width: 800px) {
		.video, .video .mux-player {
			max-height: var(--tablet-height-max);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video, .video .mux-player {
			max-height: var(--desktop-height-max);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video, .video .mux-player {
			max-height: var(--large-desktop-height-max);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video, .video .mux-player {
			max-height: var(--giant-desktop-height-max);
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
