<script lang="ts">
	import { getImageProps } from '$lib/sanity';
	import type { Media } from '$lib/types';
  
	import { onMount } from 'svelte/internal';
	
	import { Image } from "@unpic/svelte";

let imageLoaded = false;

function handleImageLoad() {
	imageLoaded = true;
}

  
	onMount(async () => {
	  await import('@mux/mux-video');
	  await import('@mux/mux-player');

	});
  
	export let media: Media | undefined;
	export let carousel: boolean = false;
  </script>
  
  {#if media}
	<div
	  class={[carousel ? 'carousel' : null, media.media_type === 'video' ? 'video' : null, media.media_type === 'image' ? 'image' : null].filter(Boolean).join(' ')}
	  style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
	>
		{#if media.media_type === 'video'}
			{#if media.isInline}
			<!-- Inline Video Player -->

			<media-controller
			style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
			class="inline"

			>
			<mux-video
				muted
				autoplay="muted"
				loop
				playsinline
				slot="media"
				stream-type="on-demand"
				playback-id={media.video.playback_id}
				poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
			/>
				<media-control-bar>
				<media-play-button>
					<svg slot="play" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_658)">
						<path d="M18.9998 12.0003C19.0002 12.1701 18.9566 12.3371 18.8734 12.485C18.7902 12.633 18.6701 12.7569 18.5248 12.8447L9.51976 18.3534C9.36793 18.4464 9.19405 18.4972 9.01605 18.5005C8.83806 18.5037 8.66242 18.4595 8.50726 18.3722C8.35357 18.2863 8.22555 18.161 8.13636 18.0091C8.04716 17.8573 8.00001 17.6845 7.99976 17.5084V6.49219C8.00001 6.31612 8.04716 6.14329 8.13636 5.99148C8.22555 5.83967 8.35357 5.71436 8.50726 5.62844C8.66242 5.54115 8.83806 5.49688 9.01605 5.50017C9.19405 5.50347 9.36793 5.55422 9.51976 5.64719L18.5248 11.1559C18.6701 11.2437 18.7902 11.3676 18.8734 11.5156C18.9566 11.6636 19.0002 11.8305 18.9998 12.0003Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_658">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
					
					<svg slot="pause" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_662)">
						<path d="M17.4996 7V17L17.4995 17.5V18H12.9996L12.9995 17.5L12.9996 17V7V6.5V6H17.4996V6.5V7ZM10.9996 6H6.49951L6.4998 6.5L6.4996 7V17L6.49951 17.5V18H10.9995V17.5L10.9996 17V7V6.5V6Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_662">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
				</media-play-button>
				
				<media-fullscreen-button>
					<svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_671)">
						<path d="M17.5 7V9.5C17.5001 9.59895 17.4708 9.69569 17.4159 9.77799C17.3609 9.86029 17.2828 9.92444 17.1914 9.96231C17.1 10.0002 16.9994 10.0101 16.9023 9.99076C16.8053 9.97144 16.7162 9.92376 16.6462 9.85375L14.1462 7.35375C14.0762 7.28382 14.0286 7.1947 14.0092 7.09765C13.9899 7.00061 13.9998 6.90002 14.0377 6.80861C14.0756 6.71719 14.1397 6.63908 14.222 6.58414C14.3043 6.5292 14.4011 6.49992 14.5 6.5H17C17.1326 6.5 17.2598 6.55268 17.3536 6.64645C17.4473 6.74022 17.5 6.86739 17.5 7ZM7.35375 14.1462C7.28382 14.0762 7.1947 14.0286 7.09765 14.0092C7.00061 13.9899 6.90002 13.9998 6.80861 14.0377C6.71719 14.0756 6.63908 14.1397 6.58414 14.222C6.5292 14.3043 6.49992 14.4011 6.5 14.5V17C6.5 17.1326 6.55268 17.2598 6.64645 17.3536C6.74022 17.4473 6.86739 17.5 7 17.5H9.5C9.59895 17.5001 9.69569 17.4708 9.77799 17.4159C9.86029 17.3609 9.92444 17.2828 9.96231 17.1914C10.0002 17.1 10.0101 16.9994 9.99076 16.9023C9.97144 16.8053 9.92376 16.7162 9.85375 16.6462L7.35375 14.1462ZM17.1912 14.0381C17.0999 14.0002 16.9994 13.9903 16.9023 14.0095C16.8053 14.0288 16.7162 14.0763 16.6462 14.1462L14.1462 16.6462C14.0762 16.7162 14.0286 16.8053 14.0092 16.9023C13.9899 16.9994 13.9998 17.1 14.0377 17.1914C14.0756 17.2828 14.1397 17.3609 14.222 17.4159C14.3043 17.4708 14.4011 17.5001 14.5 17.5H17C17.1326 17.5 17.2598 17.4473 17.3536 17.3536C17.4473 17.2598 17.5 17.1326 17.5 17V14.5C17.5 14.4011 17.4706 14.3044 17.4157 14.2222C17.3607 14.14 17.2826 14.076 17.1912 14.0381ZM9.5 6.5H7C6.86739 6.5 6.74022 6.55268 6.64645 6.64645C6.55268 6.74022 6.5 6.86739 6.5 7V9.5C6.49992 9.59895 6.5292 9.69569 6.58414 9.77799C6.63908 9.86029 6.71719 9.92444 6.80861 9.96231C6.90002 10.0002 7.00061 10.0101 7.09765 9.99076C7.1947 9.97144 7.28382 9.92376 7.35375 9.85375L9.85375 7.35375C9.92376 7.28382 9.97144 7.1947 9.99076 7.09765C10.0101 7.00061 10.0002 6.90002 9.96231 6.80861C9.92444 6.71719 9.86029 6.63908 9.77799 6.58414C9.69569 6.5292 9.59895 6.49992 9.5 6.5Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_671">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
					</svg>												
				</media-fullscreen-button>
				</media-control-bar>
			</media-controller>
			{:else}
			<!-- Full Video Player -->
			<media-controller
			style={`${media.media_type === 'video' ? `aspect-ratio: ${media.video.aspect_ratio.replace(':', '/')};` : ''}`}
			>
			<mux-video
				slot="media"
				stream-type="on-demand"
				playback-id={media.video.playback_id}
				poster={media.video_thumbnail ? getImageProps({ image: media.video_thumbnail, maxWidth: 1280 }).src : undefined}
			/>
				<media-control-bar>
				<media-play-button>
					<svg slot="play" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_658)">
						<path d="M18.9998 12.0003C19.0002 12.1701 18.9566 12.3371 18.8734 12.485C18.7902 12.633 18.6701 12.7569 18.5248 12.8447L9.51976 18.3534C9.36793 18.4464 9.19405 18.4972 9.01605 18.5005C8.83806 18.5037 8.66242 18.4595 8.50726 18.3722C8.35357 18.2863 8.22555 18.161 8.13636 18.0091C8.04716 17.8573 8.00001 17.6845 7.99976 17.5084V6.49219C8.00001 6.31612 8.04716 6.14329 8.13636 5.99148C8.22555 5.83967 8.35357 5.71436 8.50726 5.62844C8.66242 5.54115 8.83806 5.49688 9.01605 5.50017C9.19405 5.50347 9.36793 5.55422 9.51976 5.64719L18.5248 11.1559C18.6701 11.2437 18.7902 11.3676 18.8734 11.5156C18.9566 11.6636 19.0002 11.8305 18.9998 12.0003Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_658">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
					
					<svg slot="pause" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_662)">
						<path d="M17.4996 7V17L17.4995 17.5V18H12.9996L12.9995 17.5L12.9996 17V7V6.5V6H17.4996V6.5V7ZM10.9996 6H6.49951L6.4998 6.5L6.4996 7V17L6.49951 17.5V18H10.9995V17.5L10.9996 17V7V6.5V6Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_662">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
						</svg>
						
				</media-play-button>
				<media-time-display notoggle></media-time-display>
				<media-time-range>
					<span slot="preview"></span>
				</media-time-range>
				<media-mute-button>
					<svg slot="off" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.72 5.55071C13.6358 5.50961 13.5418 5.49298 13.4487 5.5027C13.3555 5.51243 13.267 5.54812 13.1931 5.60571L8.82812 9.00009H6C5.73478 9.00009 5.48043 9.10544 5.29289 9.29298C5.10536 9.48052 5 9.73487 5 10.0001V14.0001C5 14.2653 5.10536 14.5197 5.29289 14.7072C5.48043 14.8947 5.73478 15.0001 6 15.0001H8.82812L13.1931 18.3945C13.2807 18.4631 13.3888 18.5003 13.5 18.5001C13.6326 18.5001 13.7598 18.4474 13.8536 18.3536C13.9473 18.2599 14 18.1327 14 18.0001V6.00009C14.0001 5.90648 13.9739 5.81474 13.9244 5.73529C13.8749 5.65585 13.8041 5.5919 13.72 5.55071Z" fill="white"/>
						<path d="M18.2069 12.0003L19.3538 10.854C19.4476 10.7602 19.5003 10.633 19.5003 10.5003C19.5003 10.3676 19.4476 10.2403 19.3538 10.1465C19.26 10.0527 19.1327 10 19 10C18.8674 10 18.7401 10.0527 18.6463 10.1465L17.5 11.2934L16.3538 10.1465C16.26 10.0527 16.1327 10 16 10C15.8674 10 15.7401 10.0527 15.6463 10.1465C15.5525 10.2403 15.4998 10.3676 15.4998 10.5003C15.4998 10.633 15.5525 10.7602 15.6463 10.854L16.7932 12.0003L15.6463 13.1465C15.5525 13.2403 15.4998 13.3676 15.4998 13.5003C15.4998 13.633 15.5525 13.7602 15.6463 13.854C15.7401 13.9478 15.8674 14.0006 16 14.0006C16.1327 14.0006 16.26 13.9478 16.3538 13.854L17.5 12.7072L18.6463 13.854C18.7401 13.9478 18.8674 14.0006 19 14.0006C19.1327 14.0006 19.26 13.9478 19.3538 13.854C19.4476 13.7602 19.5003 13.633 19.5003 13.5003C19.5003 13.3676 19.4476 13.2403 19.3538 13.1465L18.2069 12.0003Z" fill="white"/>
					</svg>
					<svg slot="low" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14 6.00011V18.0001C13.9999 18.0937 13.9736 18.1853 13.924 18.2647C13.8745 18.344 13.8036 18.4079 13.7196 18.449C13.6355 18.49 13.5416 18.5067 13.4485 18.4971C13.3555 18.4875 13.267 18.4519 13.1931 18.3945L8.82812 15.0001H6C5.73478 15.0001 5.48043 14.8948 5.29289 14.7072C5.10536 14.5197 5 14.2653 5 14.0001V10.0001C5 9.7349 5.10536 9.48054 5.29289 9.29301C5.48043 9.10547 5.73478 9.00011 6 9.00011H8.82812L13.1931 5.60574C13.267 5.54832 13.3555 5.51277 13.4485 5.50314C13.5416 5.49352 13.6355 5.51019 13.7196 5.55128C13.8036 5.59236 13.8745 5.6562 13.924 5.73555C13.9736 5.81489 13.9999 5.90655 14 6.00011ZM16 10.0001C15.8674 10.0001 15.7402 10.0528 15.6464 10.1466C15.5527 10.2403 15.5 10.3675 15.5 10.5001V13.5001C15.5 13.6327 15.5527 13.7599 15.6464 13.8537C15.7402 13.9474 15.8674 14.0001 16 14.0001C16.1326 14.0001 16.2598 13.9474 16.3536 13.8537C16.4473 13.7599 16.5 13.6327 16.5 13.5001V10.5001C16.5 10.3675 16.4473 10.2403 16.3536 10.1466C16.2598 10.0528 16.1326 10.0001 16 10.0001ZM18 9.00011C17.8674 9.00011 17.7402 9.05279 17.6464 9.14656C17.5527 9.24033 17.5 9.36751 17.5 9.50011V14.5001C17.5 14.6327 17.5527 14.7599 17.6464 14.8537C17.7402 14.9474 17.8674 15.0001 18 15.0001C18.1326 15.0001 18.2598 14.9474 18.3536 14.8537C18.4473 14.7599 18.5 14.6327 18.5 14.5001V9.50011C18.5 9.36751 18.4473 9.24033 18.3536 9.14656C18.2598 9.05279 18.1326 9.00011 18 9.00011Z" fill="white"/>
						</svg>
												
				</media-mute-button>
				<media-fullscreen-button>
					<svg slot="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_965_671)">
						<path d="M17.5 7V9.5C17.5001 9.59895 17.4708 9.69569 17.4159 9.77799C17.3609 9.86029 17.2828 9.92444 17.1914 9.96231C17.1 10.0002 16.9994 10.0101 16.9023 9.99076C16.8053 9.97144 16.7162 9.92376 16.6462 9.85375L14.1462 7.35375C14.0762 7.28382 14.0286 7.1947 14.0092 7.09765C13.9899 7.00061 13.9998 6.90002 14.0377 6.80861C14.0756 6.71719 14.1397 6.63908 14.222 6.58414C14.3043 6.5292 14.4011 6.49992 14.5 6.5H17C17.1326 6.5 17.2598 6.55268 17.3536 6.64645C17.4473 6.74022 17.5 6.86739 17.5 7ZM7.35375 14.1462C7.28382 14.0762 7.1947 14.0286 7.09765 14.0092C7.00061 13.9899 6.90002 13.9998 6.80861 14.0377C6.71719 14.0756 6.63908 14.1397 6.58414 14.222C6.5292 14.3043 6.49992 14.4011 6.5 14.5V17C6.5 17.1326 6.55268 17.2598 6.64645 17.3536C6.74022 17.4473 6.86739 17.5 7 17.5H9.5C9.59895 17.5001 9.69569 17.4708 9.77799 17.4159C9.86029 17.3609 9.92444 17.2828 9.96231 17.1914C10.0002 17.1 10.0101 16.9994 9.99076 16.9023C9.97144 16.8053 9.92376 16.7162 9.85375 16.6462L7.35375 14.1462ZM17.1912 14.0381C17.0999 14.0002 16.9994 13.9903 16.9023 14.0095C16.8053 14.0288 16.7162 14.0763 16.6462 14.1462L14.1462 16.6462C14.0762 16.7162 14.0286 16.8053 14.0092 16.9023C13.9899 16.9994 13.9998 17.1 14.0377 17.1914C14.0756 17.2828 14.1397 17.3609 14.222 17.4159C14.3043 17.4708 14.4011 17.5001 14.5 17.5H17C17.1326 17.5 17.2598 17.4473 17.3536 17.3536C17.4473 17.2598 17.5 17.1326 17.5 17V14.5C17.5 14.4011 17.4706 14.3044 17.4157 14.2222C17.3607 14.14 17.2826 14.076 17.1912 14.0381ZM9.5 6.5H7C6.86739 6.5 6.74022 6.55268 6.64645 6.64645C6.55268 6.74022 6.5 6.86739 6.5 7V9.5C6.49992 9.59895 6.5292 9.69569 6.58414 9.77799C6.63908 9.86029 6.71719 9.92444 6.80861 9.96231C6.90002 10.0002 7.00061 10.0101 7.09765 9.99076C7.1947 9.97144 7.28382 9.92376 7.35375 9.85375L9.85375 7.35375C9.92376 7.28382 9.97144 7.1947 9.99076 7.09765C10.0101 7.00061 10.0002 6.90002 9.96231 6.80861C9.92444 6.71719 9.86029 6.63908 9.77799 6.58414C9.69569 6.5292 9.59895 6.49992 9.5 6.5Z" fill="white"/>
						</g>
						<defs>
						<clipPath id="clip0_965_671">
						<rect width="16" height="16" fill="white" transform="translate(4 4)"/>
						</clipPath>
						</defs>
					</svg>												
				</media-fullscreen-button>
				</media-control-bar>
			</media-controller>
			{/if}
		{:else if media.media_type === 'image' && media.image}
			<!-- Image Rendering -->
			<div class:image-loaded={imageLoaded} style="background: {media.image.asset.metadata.palette.dominant.background};">
				<Image
					class="media-image"
					alt={media.image.alt}
					src={media.image.asset.url}  
					layout="constrained"
					width={media.image.asset.metadata.dimensions.width}
					aspectRatio={media.image.asset.metadata.dimensions.aspectRatio}
					background={media.image.asset.metadata.palette.dominant.background}
					on:load={handleImageLoad}
				/>	
			</div>
			<!-- <img
			alt={media.alt}
			{...getImageProps({ image: media.image, maxWidth: 2000 })}
			/> -->
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
	}

	.image-loaded :global(.media-image){
		opacity: 1;
		transition: opacity 1s;
	}

	media-controller {
		--media-control-background: rgba(255, 255, 255, 0);
		--media-control-hover-background: rgba(255, 255, 255, 0);
		--media-font-family: var(--font-serif);
		--media-primary-color: var(--white);
		--media-font-size: var(--font-size);
		--media-range-track-border-radius: 0px;
		--media-range-thumb-width: 0px;
		--media-range-thumb-height: 0px;
		--media-control-hover-background: rgba(255, 255, 255, 0);
	}
	

	media-play-button svg, media-mute-button svg, media-fullscreen-button svg {
		opacity: 1;
	}

	media-play-button:hover svg, media-mute-button:hover svg, media-fullscreen-button:hover svg{
		opacity: 0.5;
	}

	.inline media-fullscreen-button {
		right: 0;
		position: absolute;
	}
	

	.carousel {
		background: yellow;
	}

	div {
		width: 100%;
	}

	media-control-bar {
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
