<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';

	import { onMount } from 'svelte/internal';

	onMount(async () => {
		await import('@mux/mux-player');
	});

	export let media: Media | undefined;
	export let carousel: boolean = false;
	export let onClick: () => void | undefined = undefined;
</script>

{#if media}
	<div
		class:carousel
		class:rounded={media.rounded}
		style={media.media_type === 'video'
			? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')}`
			: ''}
	>
		{#if media.media_type === 'video'}
			<mux-player
				class="mux-player"
				muted={true}
				autoplay={media.autoplay}
				loop={media.autoplay}
				stream-type="on-demand"
				playback-id={media.video.playback_id}
			/>
		{:else if media.media_type === 'image' && media.image}
			<img
				on:mouseup={onClick}
				alt="Hello"
				{...getImageProps({ image: media.image, maxWidth: 2000 })}
			/>
		{/if}
	</div>
{/if}

<style>
	div {
		width: 100%;
	}

	.rounded {
		border-radius: var(--rounded);
		overflow: hidden;
	}
	img {
		width: 100%;
		height: auto;
	}

	.mux-player {
		height: 100%;
		width: 100%;
		--controls: none;
	}

	.carousel {
		width: auto;
		height: 100%;
	}

	.carousel > img {
		width: auto;
		height: 100%;
	}
</style>
