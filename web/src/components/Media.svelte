<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
  
	import { onMount } from 'svelte/internal';
	
	import { Image } from "@unpic/svelte";

	let imageLoaded = false;

	function handleImageLoad() {
		imageLoaded = true;
	}

	onMount(async () => {
		await import('@mux/mux-player');
		await import('@mux/mux-video');
	});

	export let isBlackControls: boolean = false;

	export let media: Media | undefined;
	export let carousel: boolean = false;
  </script>
  
  {#if media}
	<div
	  class={[carousel ? 'carousel' : null, media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
	  class:is-black={media.isBlackControls}
	>
		{#if media.media_type === 'video'}
			{#if media.isInline}
			<!-- Inline Video Player -->

  			<mux-video
				class="video"
			  style={`aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};`}
			  muted
			  autoplay
			  loop
			  playsinline
			  controls
			  stream-type="on-demand"
			  playback-id={media.video.playback_id}
			  poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
			>

			</mux-video>
			

			{:else}

			<!-- Fullscreen Video Player -->
			{/if}
		{:else if media.media_type === 'image' && media.image}
			<!-- Image Rendering -->
			<div class:image-loaded={imageLoaded}>
				<Image
					class="media-image"
					alt={media.image.asset.altText}
					src={media.image.asset.url}  
					layout="constrained"
					width={media.image.asset.metadata.dimensions.width}
					aspectRatio={media.image.asset.metadata.dimensions.aspectRatio}
					background="#FFFFFF"
					on:load={handleImageLoad}
					sizes="(max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 960px) 960px, (max-width: 1080px) 1080px, (max-width: 1280px) 1280px, (max-width: 1668px) 1668px, (max-width: 1920px) 1920px, (max-width: 2048px) 2048px, (max-width: 2560px) 2560px, (max-width: 3200px) 3200px, (max-width: 3840px) 3840px, (max-width: 4480px) 4480px, (max-width: 5120px) 5120px, (max-width: 6016px) 6016px, 100vw"
				/>	
			</div>
		{/if}
	</div>
  {/if}

<style>

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

	:global(mux-video) {
		border: 1px solid purple;
		/* --media-object-fit: contain;
		--media-object-position: left top; */
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

	.image {
		display: grid !important;
		max-width: 100%;
		/* background: yellow; */
	}

    .video  {
		background: orange;
        max-width: 100%; 
        display: flex; 
		max-width: var(--mobile-width-max);
		max-height: var(--mobile-height-max) !important;
	}

	.image {
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

    :global(.media-image) {
        max-width: 100% !important; /* Ensures the content does not exceed the width of its container */
        max-height: var(--mobile-height-max) !important; /* Caps the maximum height */
        object-fit: contain; /* Ensures the content fits within the container without losing its aspect ratio */
        width: auto; /* Allows the content to scale its width in proportion to its height */
        height: auto; /* Allows the content to scale its height in proportion to its width */
    }

	  /* Tablet */
	  @media (min-width: 800px) {
                .image, :global(.media-image) {
                        max-height: var(--tablet-height-max) !important;
                        max-width: calc(var(--tablet-width-max) - var(--half-space));
                }
				.video {
					max-height: var(--tablet-height-max) !important;
					max-width: calc(var(--tablet-width-max) - var(--half-space));
				}
        }
        /* Small Desktop */
        @media (min-width: 1280px) {
                .image, :global(.media-image) {
                        max-height: var(--desktop-height-max) !important;
                        max-width: calc(var(--desktop-width-max) - var(--half-space));
                }
				 .video {
					max-height: var(--desktop-height-max) !important;
					max-width: calc(var(--desktop-width-max) - var(--half-space));
				}
        }
        /* Desktop */
        @media (min-width: 1700px) {
                .image, :global(.media-image) {
                        max-height: var(--large-desktop-height-max) !important;
                        max-width: calc(var(--large-desktop-width-max) - var(--half-space));
                }
				 .video {
					max-height: var(--large-desktop-height-max) !important;
					max-width: calc(var(--large-desktop-width-max) - var(--half-space));
				} 
        }
        /* Monsters */
        @media (min-width: 2500px) {
                .image, :global(.media-image) {
                        max-height: var(--giant-desktop-height-max) !important;
                        max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
                }
				.video {
					max-height: var(--giant-desktop-height-max) !important;
					max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
				} 
        }

</style>
