<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';

	import { onMount } from 'svelte/internal';

	onMount(async () => {
		await import('@mux/mux-player');
	});

	export let media: Media | undefined;
	export let carousel: boolean = false;
</script>

{#if media}
	<div
	class={[carousel ? 'carousel' : null, media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
		style={media.media_type === 'video'
			? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')}`
			: ''}
	>
		{#if media.media_type === 'video'}
			<mux-player
				class={`mux-player${media.autoplay || !media.video_controls ? ' no-controls' : ''}`}
				muted={media.muted}
				autoplay={media.muted && media.autoplay ? 'muted' : false}
				loop={media.muted && media.autoplay}
				playsinline={media.muted && media.autoplay}
				stream-type="on-demand"
				playback-id={media.video.playback_id}
				poster={media.video_thumbnail
					? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src
					: undefined}
			/>
		{:else if media.media_type === 'image' && media.image}
			<img
				alt={media.alt}
				{...getImageProps({ image: media.image, maxWidth: 2000 })}
			/>
		{/if}
	</div>
{/if}

<style>
	div {
		width: 100%;
	}

	.image, .video {
		display: inline-block;
		max-width: 100%; /* Ensures the container does not exceed the width of its parent */
	}

    .video, .image {
        max-width: 100%; /* Ensures the container does not exceed the width of its parent */
        display: flex; /* Makes the video/image container a flex container */
        justify-content: flex-start; /* Centers the video/image horizontally */
		max-height: var(--mobile-height-max); /* Caps the maximum height */
	}

    .video .mux-player, .image img {
        max-width: 100%; /* Ensures the content does not exceed the width of its container */
        max-height: var(--mobile-height-max); /* Caps the maximum height */
        object-fit: contain; /* Ensures the content fits within the container without losing its aspect ratio */
        width: auto; /* Allows the content to scale its width in proportion to its height */
        height: auto; /* Allows the content to scale its height in proportion to its width */
    }

	/* Tablet */
	@media (min-width: 800px) {
		.video, .image, .image img, .video .mux-player {
			max-height: var(--tablet-height-max);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.video, .image, .image img, .video .mux-player {
			max-height: var(--desktop-height-max);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.video, .image, .image img, .video .mux-player {
			max-height: var(--large-desktop-height-max);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.video, .image, .image img, .video .mux-player {
			max-height: var(--giant-max);
		}
	}

	.mux-player {
		height: 100%;
		width: 100%;
	}

	.mux-player.no-controls {
		--controls: none;
	}

	.carousel {
		width: auto;
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
