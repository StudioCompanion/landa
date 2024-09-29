<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import PlayIcon from './icons/PlayIcon.svelte';
    import PauseIcon from './icons/PauseIcon.svelte';
    import MuteIcon from './icons/MuteIcon.svelte';
    import UnmuteIcon from './icons/UnmuteIcon.svelte';
    import FullscreenIcon from './icons/FullscreenIcon.svelte';

    const dispatch = createEventDispatcher();

    export let src: string;
    export let poster: string | undefined;
    export let isInline: boolean;
    export let isBlackControls: boolean;
    export let initialMuted: boolean = false;

    let videoElement: HTMLVideoElement;
    let isPlaying = false;
    let isMuted = initialMuted;
    let isFullscreen = false;
    let controlsVisible = false;
    let currentTime = 0;
    let duration = 0;

    $: showControls = (!isPlaying && !isInline) || controlsVisible;

    function handleMouseEnter() {
        controlsVisible = true;
    }

    function handleMouseLeave() {
        if (isInline || isPlaying) controlsVisible = false;
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
            isMuted = !isMuted;
            videoElement.muted = isMuted;
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

    function handleVideoClick() {
        togglePlay();
    }

	export function play() {
//   console.log("Play method called in VideoPlayer");
  if (videoElement && !isPlaying) {
    videoElement.play().then(() => {
      isPlaying = true;
    }).catch(error => {
    //   console.log("Play was prevented:", error);
    });
  }
}

export function pause() {
//   console.log("Pause method called in VideoPlayer");
  if (videoElement && isPlaying) {
    videoElement.pause();
    isPlaying = false;
  }
}

export function reset() {
//   console.log("Reset method called in VideoPlayer");
  if (videoElement) {
    videoElement.currentTime = 0;
  }
}

onMount(() => {
//   console.log("VideoPlayer mounted");
  dispatch('ready', { play, pause, reset });
});

  onMount(() => {
	// console.log("VideoPlayer mounted");

        if (videoElement) {
            videoElement.muted = isMuted;
            if (isInline) {
                videoElement.play().catch(error => {
                    // console.log("Autoplay was prevented:", error);
                    isPlaying = false;
                });
            }
            dispatch('videoElement', videoElement);
        }

        videoElement.setAttribute("muted", "true");
        videoElement.removeAttribute('controls');
        videoElement.controls = false;  // Explicitly disable the controls

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
		const methods = { play, pause, reset };
		// console.log("Dispatching video methods:", methods);
		dispatch('ready', methods);
	});
</script>

<div 
    class="video-container"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    <video
        bind:this={videoElement}
        class="video"
        {src}
        {poster}
        autoplay={isInline}
        muted={isMuted}
        loop={isInline}
        playsinline
        disablePictureInPicture
        on:timeupdate={handleTimeUpdate}
        on:durationchange={handleDurationChange}
        on:play={() => isPlaying = true}
        on:pause={() => isPlaying = false}
        on:click={togglePlay}
    >
        <source {src} type="video/mp4" />
    </video>
    
    {#if showControls || (!isPlaying && !isInline)}
        <div 
            class="video-controls" 
            class:inline-controls={isInline} 
            class:full-controls={!isInline} 
            class:black-controls={isBlackControls}
        >
            <button on:click|stopPropagation={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {#if isPlaying}
                    <PauseIcon />
                {:else}
                    <PlayIcon />
                {/if}
            </button>
            <button on:click={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {#if isMuted}
                    <MuteIcon />
                {:else}
                    <UnmuteIcon />
                {/if}
            </button>
            {#if !isInline}
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
                <span class="time-display">
                    {formatTime(duration - currentTime)}
                </span>
                <button on:click={toggleFullscreen} aria-label="Fullscreen">
                    <FullscreenIcon />
                </button>
            {/if}
        </div>
    {/if}
</div>

<style>
    .video {
        display: inline-flex;
        justify-content: flex-start; /* Centers the video/image horizontally */
        max-height: var(--mobile-height-max) !important;
        max-width: 100%;
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

    /* Tablet */
    @media (min-width: 800px) {
        .video {
            max-height: var(--tablet-height-max) !important;
            max-width: 100%;
        }
    }

    /* Small Desktop */
    @media (min-width: 1280px) {
        .video {
            max-height: var(--desktop-height-max) !important;
            max-width: calc(var(--desktop-width-max) - var(--half-space));
        }
    }

    /* Desktop */
    @media (min-width: 1700px) {
        .video {
            max-height: var(--large-desktop-height-max) !important;
            max-width: calc(var(--large-desktop-width-max) - var(--half-space));
        }
    }

    /* Monsters */
    @media (min-width: 2500px) {
        .video {
            max-height: var(--giant-desktop-height-max) !important;
            max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
        }
    }

    video::-webkit-media-controls {
        pointer-events: none;
        opacity: 0 !important;
    }

    video::-webkit-media-controls-start-playback-button {
        display: none !important;
        opacity: 0 !important;
    }

    @media not all and (min-resolution: 0.001dpcm) {
        @supports (-webkit-appearance:none) {
            video::-webkit-media-controls-start-playback-button {
                display: none !important;
            }
        }
    }

</style>