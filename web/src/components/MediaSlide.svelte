<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
    import { afterUpdate } from 'svelte';
	import { onMount } from 'svelte/internal';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import VideoPlayer from './VideoPlayer.svelte';

	import { Image } from "@unpic/svelte";


	let imageLoaded = false;
	let staticVideoUrl = '';  // Declare staticVideoUrl at the top
	let videoElement;
	let videoLoaded = false;

	function handleImageLoad() {
		imageLoaded = true;
	}

	// onMount ensures that the video URL is set based on media type.
	onMount(() => {
		loadVideo();
	});

	export let media: Media | undefined;

	export let isBlackControls: boolean = false; // Default to false if not provided

	let videoPlayerComponent;

async function loadVideo() {
	// console.log('loadVideo called', { mediaType: media?.type, videoLoaded });
	if (media?.type === 'video' && media.video) {
		const playbackId = media.video.playbackId;
		if (playbackId) {
			// console.log('Setting video URL for playbackId:', playbackId);
			staticVideoUrl = `https://stream.mux.com/${playbackId}/high.mp4`;
			videoLoaded = true;
		}
	}
}

function handleVideoReady(event) {
	// console.log('Video ready event received in MediaSlide:', event.detail);
	// console.log('Current media type:', media?.type);
	// console.log('Is video loaded:', videoLoaded);
	dispatch('registerVideo', event.detail);
}

</script>

{#if media}
    {#if media.type === 'video'}
    <div
            class={media.type}
            style={`${media.type === 'video' ? `aspect-ratio: ${media.aspectRatio.replace(':', '/')};` : ''}`}
            class:is-black={media.isBlackControls}
        >
		<VideoPlayer
		bind:this={videoPlayerComponent}
		src={staticVideoUrl}
		poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 2250 }).src : undefined}
		isInline={media.isInline}
		isBlackControls={media.isBlackControls}
		initialMuted={media.isInline}
		on:ready={handleVideoReady}
	  />
        </div>
    {:else if media.type === 'image'}
	<div class:image-loaded={imageLoaded}>


		<!-- <img 			src={media.image.asset.url}  > -->

		<Image
		class="media-slide-image"
			alt={media.image.asset.altText}
			layout="constrained"
			width={media.image.asset.metadata.dimensions.width}
			aspectRatio={media.image.asset.metadata.dimensions.aspectRatio}
			background="#FFFFFF"
			sizes="(max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 960px) 960px, (max-width: 1080px) 1080px, (max-width: 1280px) 1280px, (max-width: 1668px) 1668px, (max-width: 1920px) 1920px, (max-width: 2048px) 2048px, (max-width: 2560px) 2560px, (max-width: 3200px) 3200px, (max-width: 3840px) 3840px, (max-width: 4480px) 4480px, (max-width: 5120px) 5120px, (max-width: 6016px) 6016px, 100vw"
			on:load={handleImageLoad}
			src={media.image.asset.url}
			/>	
	</div>
    {/if}
{/if}

<style>
	
	.image-loaded {
		display: inline;
		height: auto;
	}

	:global(.media-slide-image) {
		opacity: 0;
		transition: opacity 1s;
	}

	.image-loaded :global(.media-slide-image){
		opacity: 1;
		transition: opacity 1s;
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


	/* Tablet */
	@media (min-width: 800px) {
		.video {
			max-height: var(--tablet-height-max);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video {
			max-height: var(--desktop-height-max);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video {
			max-height: var(--large-desktop-height-max);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video {
			max-height: var(--giant-desktop-height-max);
		}
	}
</style>