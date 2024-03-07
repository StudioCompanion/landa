<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';

	import { onMount } from 'svelte/internal';

	onMount(async () => {
		await import('@mux/mux-player');
	});

	export let media: Media | undefined;
</script>

{#if media}
	<div

style={media.type === 'video'
			? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')}`
			: ''}
	>
	{#if media.type === 'video'}
		{#if media.isInline}
		Inline
		<!-- Inline Video Player -->
		<mux-player
			class="mux-player inline-video no-controls"
			muted
			autoplay="muted"
			loop
			playsinline
			stream-type="on-demand"
			playback-id={media.video.playback_id}
			poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
		/>
		{:else}
		<!-- Full Video Player -->
		<mux-player
			class="mux-player full-video"
			controls
			stream-type="on-demand"
			playback-id={media.video.playback_id}
			poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
		/>
		{/if}
	{:else if media.type === 'image' && media.image}
		<!-- Image Rendering -->
		<img
		alt={media.alt}
		{...getImageProps({ image: media.image, maxWidth: 2000 })}
		/>
	{/if}
	</div>
{/if}

<style>
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
</style>