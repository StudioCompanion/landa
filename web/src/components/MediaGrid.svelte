<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
	import { onMount } from 'svelte/internal';
	import { Image } from "@unpic/svelte";
	import VideoPlayer from './VideoPlayer.svelte';

	let imageLoaded = false;
	let staticVideoUrl = '';  // Declare staticVideoUrl at the top

	function handleImageLoad() {
		imageLoaded = true;
	}

	onMount(() => {
    if (media && media.media_type === 'video' && media.video) {
        const playbackId = media.video.playback_id;
        if (playbackId) {
            staticVideoUrl = `https://stream.mux.com/${playbackId}/high.mp4`;
        }
    }
});

	export let media: Media | undefined;
</script>

{#if media}
	<div
		class:is-black={media.isBlackControls}
	style={media.media_type === 'video'
			? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')}`
			: ''}
			
	>
	{#if media.media_type === 'video'}
    <VideoPlayer
        src={staticVideoUrl}
        poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 2250 }).src : undefined}
        isInline={media.isInline}
        isBlackControls={media.isBlackControls}
        initialMuted={media.isInline}
    />
{:else if media.media_type === 'image' && media.image}
		<!-- Image Rendering -->
		<div class:image-loaded={imageLoaded}>
			<Image
				class="media-grid-image"
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
	img {
		width: 100%;
		height: auto;
		display: block;
	}

	.image-loaded {
		display: flex;
	}

	:global(.media-grid-image) {
		opacity: 0;
		transition: opacity 1s;
	}

	.image-loaded :global(.media-grid-image){
		opacity: 1;
		transition: opacity 1s;
	}
</style>