<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
  
	import { Image } from "@unpic/svelte";
	import VideoPlayer from './VideoPlayer.svelte';

	let imageLoaded = false;
	let staticVideoUrl = '';
	let initialMuted: boolean;

	function handleImageLoad() {
		imageLoaded = true;
	}

	export let media: Media | undefined;

	export let carousel: boolean = false;

	$: {
		if (media && media.media_type === 'video' && media.video) {
			const playbackId = media.video.playback_id;
			if (playbackId) {
				staticVideoUrl = `https://stream.mux.com/${playbackId}/high.mp4`;
			}
		}
		if (media && media.media_type === 'video') {
			initialMuted = media.isInline; // Mute if inline, unmuted otherwise
		}
	}
</script>
  
  {#if media}
	<div
	  class={[carousel ? 'carousel' : null, media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
	  style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
	  class:is-black={media.isBlackControls}
	  class:is-inline={media.isInline}
	>
		{#if media.media_type === 'video'}
			<VideoPlayer
				src={staticVideoUrl}
				poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
				isInline={media.isInline}
				isBlackControls={media.isBlackControls}
				initialMuted={initialMuted}
			/>
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

	.video {
		display: inline-flex;
		height: 100%;
		max-height: var(--mobile-height-max) !important;
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
		.video, .image, :global(.media-image) {
			max-height: var(--tablet-height-max) !important;
			max-width: 100%;
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video, .image, :global(.media-image) {
			max-height: var(--desktop-height-max) !important;
			max-width: calc(var(--desktop-width-max) - var(--half-space));
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video, .image, :global(.media-image) {
			max-height: var(--large-desktop-height-max) !important;
			max-width: calc(var(--large-desktop-width-max) - var(--half-space));
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video, .image, :global(.media-image) {
			max-height: var(--giant-desktop-height-max) !important;
			max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
		}
	}
</style>
