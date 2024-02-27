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
		class:carousel
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

	img {
		width: 100%;
		height: auto;
		display: block;
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
