<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
  
	import { onMount } from 'svelte/internal';
	import { Image } from "@unpic/svelte";
	import PlayIcon from './icons/PlayIcon.svelte';
	import PauseIcon from './icons/PauseIcon.svelte';
	import MuteIcon from './icons/MuteIcon.svelte';
	import UnmuteIcon from './icons/UnmuteIcon.svelte';
	import FullscreenIcon from './icons/FullscreenIcon.svelte';

	let imageLoaded = false;
	let staticVideoUrl = '';  // Declare staticVideoUrl at the top

	
	let videoElement: HTMLVideoElement;
	let isPlaying = false;
	let isMuted = false;
	let isFullscreen = false;
	let controlsVisible = false;

	function handleImageLoad() {
		imageLoaded = true;
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

	function toggleFullscreen() {

if (!isFullscreen) {

  if (videoElement.requestFullscreen) {

	videoElement.requestFullscreen();

  } else if (videoElement.webkitRequestFullscreen) { /* Safari */

	videoElement.webkitRequestFullscreen();

  } else if (videoElement.msRequestFullscreen) { /* IE11 */

	videoElement.msRequestFullscreen();

  }

} else {

  if (document.exitFullscreen) {

	document.exitFullscreen();

  } else if (document.webkitExitFullscreen) { /* Safari */

	document.webkitExitFullscreen();

  } else if (document.msExitFullscreen) { /* IE11 */

	document.msExitFullscreen();

  }

}

}



function handleFullscreenChange() {

isFullscreen = !!document.fullscreenElement;

}



onMount(() => {

document.addEventListener('fullscreenchange', handleFullscreenChange);

return () => {

  document.removeEventListener('fullscreenchange', handleFullscreenChange);

};

});

	let currentTime = 0;
	let duration = 0;

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function formatRemainingTime(currentTime, duration) {
		const remainingSeconds = Math.max(0, duration - currentTime);
		return formatTime(remainingSeconds);
	}

	function handleTimeUpdate(event) {
		currentTime = event.target.currentTime;
		if (videoElement) {
			videoElement.style.setProperty('--progress', `${(currentTime / duration) * 100}%`);
		}
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

	export let media: Media | undefined;

	export let carousel: boolean = false;

	$: showControls = (!isPlaying && !media?.isInline) || controlsVisible;

	function handleMouseEnter() {
		controlsVisible = true;
	}

	function handleMouseLeave() {
		if (media?.isInline || isPlaying) controlsVisible = false;
	}

	function handleVideoClick() {
		togglePlay();
	}

</script>
  
  {#if media}
	<div
	  class={[media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
	  style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
	  class:is-black={media.isBlackControls}
	  class:is-inline={media.isInline}
	  on:mouseenter={handleMouseEnter}
	  on:mouseleave={handleMouseLeave}
	>
		{#if media.media_type === 'video'}
			<div class="video-container">
				<video
					bind:this={videoElement}
					class="video"
					autoplay={media.isInline}
					muted={media.isInline}
					loop={media.isInline}
					playsinline
					disablePictureInPicture
					src={staticVideoUrl}
					poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
					on:timeupdate={handleTimeUpdate}
					on:durationchange={handleDurationChange}
					on:play={() => isPlaying = true}
					on:pause={() => isPlaying = false}
					on:click={handleVideoClick}
					on:error={(e) => console.error("Video loading error:", e.target.error)}
				>
					<source src={staticVideoUrl} type="video/mp4" />
				</video>
				{#if showControls || (!isPlaying && !media.isInline)}
					<div 
						class="video-controls" 
						class:inline-controls={media.isInline} 
						class:full-controls={!media.isInline} 
						class:black-controls={media.isBlackControls}
					>
						<button on:click|stopPropagation={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
							{#if isPlaying}
								<PauseIcon />
							{:else}
								<PlayIcon />
							{/if}
						</button>
						{#if !media.isInline}
						<span class="time-display">
							{formatRemainingTime(currentTime, duration)}
						</span>
						<div class="progress-container">
							<progress value={currentTime} max={duration}></progress>
							<input 
								type="range" 
								min="0" 
								max={duration} 
								value={currentTime}
								on:input={handleProgressBarChange}
							/>
						</div>
						{/if}
						<button on:click={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
							{#if isMuted}
								<MuteIcon />
							{:else}
								<UnmuteIcon />
							{/if}
						</button>
						{#if !media.isInline}
						<button on:click={toggleFullscreen} aria-label="Fullscreen">
							<FullscreenIcon />
						</button>
						{/if}
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
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 12px;
		opacity: 1;
		transition: opacity 0.2s ease;
		transition-delay: 0.5s;
	}

	.video-controls button {
		background-color: transparent;
		color: white;
		border: none;
		padding: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-controls.black-controls button {
		color: black;
	}

	.video-controls button :global(svg) {
		width: 20px;
		height: 20px;
	}

	.video-controls button:hover {
		opacity: 0.5;
	}

	.video-controls.black-controls button:hover {
		opacity: 0.5;
	}

	.time-display {
		color: white;
		font-family: var(--font-serif);
		font-size: 14px;
		margin-top: 2px;
		/* background: red; */
		padding: 4px 4px 4px 0px;
	}

	.black-controls .time-display {
		color: black;
	}

	/* Styles for the range input (progress bar) */
	input[type="range"] {
		-webkit-appearance: none;
		width: 100%;
		background: transparent;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
		margin-top: -7px; /* Adjust this to vertically center the thumb */
	}

	.black-controls input[type="range"]::-webkit-slider-thumb {
		background: #000000;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: linear-gradient(to right, #ffffff var(--progress, 0%), rgba(255, 255, 255, 0.6) var(--progress, 0%));
		border-radius: 0px;
	}

	.black-controls input[type="range"]::-webkit-slider-runnable-track {
		background: linear-gradient(to right, #000000 var(--progress, 0%), rgba(0, 0, 0, 0.6) var(--progress, 0%));
	}

	/* Firefox */
	input[type="range"]::-moz-range-thumb {
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
		border: none;
	}

	.black-controls input[type="range"]::-moz-range-thumb {
		background: #000000;
	}

	input[type="range"]::-moz-range-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 0px;
	}

	input[type="range"]::-moz-range-progress {
		background-color: #ffffff;
		height: 2px;
	}

	.black-controls input[type="range"]::-moz-range-track {
		background: rgba(0, 0, 0, 0.6);
	}

	.black-controls input[type="range"]::-moz-range-progress {
		background-color: #000000;
	}

	video::-webkit-media-controls-start-playback-button {
		display: none !important;
	}

	.progress-container {
		position: relative;
		width: 100%;
		height: 2px;
	}

	progress {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-appearance: none;
		appearance: none;
	}

	.black-controls progress::-webkit-progress-bar {
		background-color: rgba(0, 0, 0, 0.3);
	}

	progress::-webkit-progress-bar {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.black-controls progress::-webkit-progress-value {
		background-color: black;
	}

	progress::-webkit-progress-value {
		background-color: white;
	}

	progress::-moz-progress-bar {
		background-color: white;
	}

	input[type="range"] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		-webkit-appearance: none;
		cursor: pointer;
	}
</style>
