<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
    import { afterUpdate } from 'svelte';


	import { onMount } from 'svelte/internal';
    let muxPlayerLoaded = false;


	onMount(async () => {
		await import('@mux/mux-player');
        muxPlayerLoaded = true;
	});

    onMount(() => {
        console.log('Media component received:', media);
    });

	export let media: Media | undefined;
	export let carousel: boolean = false;

    $: if (media) {
    console.log('————Current media type————:', media.type);
    }

    onMount(() => {
        function adjustVideoSize() {
            console.log('Adjusting video size');
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

{#if media}
    {#if media.type === 'video'}
    <div
    class={media.type}
    style={`${media.type === 'video' ? `aspect-ratio: ${media.aspectRatio.replace(':', '/')};` : ''}`}
    >
        {#if media.isInline}
        <mux-player
                class="mux-slide-player inline-video no-controls"
                muted
                autoplay="muted"
                loop
                playsinline
                stream-type="on-demand"
                playback-id={media.playbackId}
                poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
        />
        {:else}
        <mux-player
            class="mux-player full-video"
            controls
            stream-type="on-demand"
            playback-id={media.playbackId}
            poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
        />
        {/if}
    </div>
    {:else if media.type === 'image'}
        <img
        alt="Default"
        {...getImageProps({ image: media.image, maxWidth: 2000 })}
        />
    {/if}
{/if}

<style>
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