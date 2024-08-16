<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
    import { afterUpdate } from 'svelte';
	import { onMount } from 'svelte/internal';
    let muxPlayerLoaded = false;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import { Image } from "@unpic/svelte";


let imageLoaded = false;

function handleImageLoad() {
	imageLoaded = true;
}

	let videoElement;


	onMount(async () => {
		await import('@mux/mux-player');
		await import('@mux/mux-video');
		muxPlayerLoaded = true;

		if (videoElement) {
			dispatch('videoElement', { videoElement });
		}
	});

    onMount(() => {
        // console.log('Media component received:', media);
		if (muxPlayerLoaded && videoElement) {
            dispatch('videoElement', videoElement);
        }
    });

	export let media: Media | undefined;

    $: if (media) {
    // console.log('————Current media type————:', media.type);
    }

    onMount(() => {
        // function adjustVideoSize() {
        //     // console.log('Adjusting video size');
        //     const videoContainers = document.querySelectorAll('.video-container');

        //     videoContainers.forEach(container => {
        //         const player = container.querySelector('.mux-slide-player');
        //         if (!player) return;

        //         // Dynamically determine or assume the aspect ratio
        //         const aspectRatio = 16 / 9;

        //         const containerWidth = container.offsetWidth;
        //         const containerHeight = container.offsetHeight;
        //         const containerRatio = containerWidth / containerHeight;

        //         let playerWidth, playerHeight;

        //         if (containerRatio > aspectRatio) {
        //             playerWidth = containerWidth;
        //             playerHeight = containerWidth / aspectRatio;
        //         } else {
        //             playerHeight = containerHeight;
        //             playerWidth = containerHeight * aspectRatio;
        //         }

        //         player.style.width = `${playerWidth}px`;
        //         player.style.height = `${playerHeight}px`;
        //     });
        //     // console.log(`Player dimensions set to width: ${playerWidth}px, height: ${playerHeight}px`);
        // }

        // adjustVideoSize(); // Call initially in case the component is already the correct size

        // // Add event listener for resize events
        // window.addEventListener('resize', adjustVideoSize);

        // // Cleanup function to remove the event listener
        // return () => {
        //     window.removeEventListener('resize', adjustVideoSize);
        // };
    });

	export let isBlackControls: boolean = false; // Default to false if not provided

</script>

{#if media}
    {#if media.type === 'video'}
    <div
    class={media.type}
    style={`${media.type === 'video' ? `aspect-ratio: ${media.aspectRatio.replace(':', '/')};` : ''}`}
	class:is-black={media.isBlackControls}
    >
        {#if media.isInline}
		<!-- Inline Video Player -->
			<mux-player
			class="mux-inline-player"
			  muted
			  autoplay="muted"
			  loop
			  playsinline
			  stream-type="on-demand"
			  playback-id={media.playbackId}
			  style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
			  poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
			>
			</mux-player>
        {:else}
		<!-- Fullscreen Video Player -->
		<mux-player
			playsinline
			stream-type="on-demand"
			playback-id={media.playbackId}
			style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
			poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
		>
		</mux-player>
        {/if}
    </div>
    {:else if media.type === 'image'}
	<div class:image-loaded={imageLoaded}>
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
		display: flex; /* Safari */
		max-width: 100%; /* Ensures the container does not exceed the width of its parent */
	}

    .video {
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