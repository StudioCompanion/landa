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
	<div class:carousel class:rounded={media.rounded}>
		{#if media.media_type === 'video'}
			<mux-player
				muted={true}
				autoplay={media.autoplay}
				loop={media.autoplay}
				stream-type="on-demand"
				playback-id={media.video.playback_id}
				style={`${
					media.autoplay ? '--controls:none' : ''
				};aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')}`}
			/>
		{:else if media.media_type === 'image' && media.image}
			<img alt="Hello" {...getImageProps({ image: media.image, maxWidth: 2000 })} />
		{/if}
	</div>
{/if}

<style>
	div {
		width: 100%;
	}

	div.rounded {
		border-radius: var(--rounded);
		overflow: hidden;
	}
	img {
		width: 100%;
		height: auto;
	}

	mux-player {
		width: 100%;
		height: auto;
		--controls: none;
	}

	div.carousel {
		width: auto;
		height: 100%;
	}

	div.carousel > img {
		width: auto;
		height: 100%;
	}
</style>
