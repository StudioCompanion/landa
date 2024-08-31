<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
  
	import { onMount } from 'svelte/internal';
	
	import { Image } from "@unpic/svelte";

	let imageLoaded = false;
	let staticVideoUrl = '';  // Declare staticVideoUrl at the top

	let videoElement: HTMLVideoElement;
	let isPlaying = false;
	let isMuted = false;

	export let isInline: boolean = false;

	function handleImageLoad() {
		imageLoaded = true;
	}

	function handleNonInlinePlay() {
		if (videoElement.paused) {
			videoElement.play();
			isPlaying = true;
		} else {
			videoElement.pause();
			isPlaying = false;
		}
	}

	function togglePlay() {
		if (videoElement) {
			if (videoElement.paused) {
				videoElement.play();
				isPlaying = true;
			} else {
				videoElement.pause();
				isPlaying = false;
			}
		}
	}

	function toggleMute() {
		if (videoElement) {
			videoElement.muted = !videoElement.muted;
			isMuted = videoElement.muted;
		}
	}

	let currentTime = 0;
	let duration = 0;

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function handleTimeUpdate(event) {
		currentTime = event.target.currentTime;
	}

	function handleDurationChange(event) {
		duration = event.target.duration;
	}

	function handleProgressBarChange(event) {
		if (videoElement) {
			videoElement.currentTime = event.target.value;
		}
	}

	onMount(() => {
		if (media && media.media_type === 'video' && media.video) {
			const playbackId = media.video.playback_id;
			if (playbackId) {
				staticVideoUrl = `https://stream.mux.com/${playbackId}/high.mp4`;
				console.log("MP4 Video URL:", staticVideoUrl);

				// Set initial state based on media.isInline
				if (media.isInline) {
					isMuted = true;
					isPlaying = true;
				} else {
					isMuted = false;
					isPlaying = false;
				}

				// Initialize video element
				if (videoElement) {
					videoElement.muted = isMuted;
					if (isPlaying) {
						videoElement.play().catch(error => {
							console.log("Autoplay was prevented:", error);
							isPlaying = false;
						});
					}
				}
			}
		}
	});

	export let isBlackControls: boolean = false;

	export let media: Media | undefined;

	export let carousel: boolean = false;

</script>
  
  {#if media}
	<div
	  class={[carousel ? 'carousel' : null, media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
	  style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
	  class:is-black={media.isBlackControls}
	  class:is-inline={media.isInline}
	>
		{#if media.media_type === 'video'}
			<div class="video-container">
				{#if media.isInline}
				Inline
					<video
						bind:this={videoElement}
						class="video"
						autoplay
						muted
						loop
						playsinline
						disablePictureInPicture
						src={staticVideoUrl}
						poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
						on:timeupdate={handleTimeUpdate}
						on:durationchange={handleDurationChange}
						on:play={() => isPlaying = true}
						on:pause={() => isPlaying = false}
					/>
					<div class="video-controls inline-controls" class:black-controls={media.isBlackControls}>
						<button on:click={togglePlay}>
							{isPlaying ? 'Pause' : 'Play'}
						</button>
						<button on:click={toggleMute}>
							{isMuted ? 'Unmute' : 'Mute'}
						</button>
					</div>
				{:else}
				Full
					<video
						bind:this={videoElement}
						class="video"
						playsinline
						disablePictureInPicture
						src={staticVideoUrl}
						poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
						on:timeupdate={handleTimeUpdate}
						on:durationchange={handleDurationChange}
					/>
					<div class="video-controls full-controls" class:black-controls={media.isBlackControls}>
						<button on:click={togglePlay}>
							{isPlaying ? 'Pause' : 'Play'}
						</button>
						<button on:click={toggleMute}>
							{isMuted ? 'Unmute' : 'Mute'}
						</button>
						<input 
							type="range" 
							min="0" 
							max={duration} 
							value={currentTime}
							on:input={handleProgressBarChange}
						/>
						<span class="time-display">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>
				{/if}
			</div>
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


	.carousel {
		/* background: yellow; */
	}

	/* div {
		width: 100%;
	} */
	
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

	.video video {
		max-width: 100%;
		/* border: 5px solid yellow; */
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
			max-width: calc(var(--tablet-width-max) - var(--half-space));
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

	.video-container {
		position: relative;
		display: inline-block;
	}

	.video-controls {
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
		display: flex;
		gap: 10px;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 5px;
		border-radius: 4px;
	}

	.video-controls.black-controls {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.video-controls button {
		background-color: transparent;
		color: black;
		border: none;
		padding: 5px 10px;
		cursor: pointer;
		border-radius: 4px;
	}

	.video-controls.black-controls button {
		color: white;
	}

	.video-controls button:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.video-controls.black-controls button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.time-display {
		color: black;
		font-size: 14px;
	}

	.black-controls .time-display {
		color: white;
	}

	/* Styles for the range input (progress bar) */
	input[type="range"] {
		-webkit-appearance: none;
		width: 100%;
		background: transparent;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	input[type="range"]:focus {
		outline: none;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
		margin-top: -5px;
	}

	.black-controls input[type="range"]::-webkit-slider-thumb {
		background: #000000;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 3px;
	}

	.black-controls input[type="range"]::-webkit-slider-runnable-track {
		background: rgba(255, 255, 255, 0.6);
	}

	/* Add similar styles for other browsers if needed */
</style>
