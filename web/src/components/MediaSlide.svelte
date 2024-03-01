<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
    import { afterUpdate } from 'svelte';


	import { onMount } from 'svelte/internal';

	onMount(async () => {
		await import('@mux/mux-player');
	});

	export let media: Media | undefined;
	export let carousel: boolean = false;

    onMount(() => {
        function adjustVideoSize() {
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
	{#if media.media_type === 'video'}
		{#if media.isInline}
		<!-- Inline Video Player -->
        <div class="video-container">
            <mux-player
                class="mux-slide-player inline-video no-controls"
                muted
                autoplay="muted"
                loop
                playsinline
                stream-type="on-demand"
                playback-id={media.video.playback_id}
                poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
            />
        </div>
		{:else}
		<!-- Full Video Player -->
        <div class="video-container">
            <mux-player
                class="mux-slide-player full-video"
                controls
                stream-type="on-demand"
                playback-id={media.video.playback_id}
                poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
            />
        </div>
		{/if}
	{:else if media.media_type === 'image' && media.image}
		<!-- Image Rendering -->
		<img
		alt={media.alt}
		{...getImageProps({ image: media.image, maxWidth: 2000 })}
		/>
	{/if}
{/if}

<style>
	.mux-player.no-controls {
		--controls: none;
	}

    .video-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: red; /* Temporarily for visibility */
}

    .mux-slide-player {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Center the video */
        /* No width and height here; they will be set dynamically */
    }
</style>