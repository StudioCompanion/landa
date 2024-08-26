<script lang="ts">
  import inView from '$lib/inView';

import { onMount } from 'svelte';
import type { Media as MediaType } from '$lib/types';
import MediaSlide from '../MediaSlide.svelte';
import ModuleCaption from '../ModuleCaption.svelte';
import GridCarouselModule from './GridCarouselModule.svelte';
import { imageBuilder } from '$lib/sanity';
import { browser } from '$app/environment';

export let module: CarouselModule;
let CarouselComponent;
let carousel; // Reference to the carousel instance
let currentSlideIndex = 0; // Index of the current slide
let slidesData = []; // Data for all slides

type CarouselModule = {
  _type: 'carousel_module';
  caption?: string;
  slides: (MediaType | GridCarouselModule)[];
};

let isMobileDevice = false; // Default to false
$: customArrowStyle = isMobileDevice ? 'display: block;' : '';
let videoElements = new Map(); // To store video elements by index

const registerVideoElement = (index, videoEl) => {
      videoElements.set(index, videoEl);
  };

let visible = false;

$: hasMultipleSlides = slidesData.length > 1;

const processSlides = () => {
// console.log('processSlides function is called');
module.slides.forEach((slide, index) => {
  // console.log(`Processing slide ${index}:`, slide); // Log each slide being processed

  if ('media_type' in slide && slide.media_type === 'image') {
    const url = imageBuilder.image(slide.image).url();
    slidesData.push({
      id: slide.image.asset._ref,
      href: url,
      type: 'image',
      caption: slide.caption,
      image: slide.image,
    });
  } else if ('media_type' in slide && slide.media_type === 'video') {
    slidesData.push({
        video: slide.video.everything,
        id: slide.video.asset_id, // Assuming this should be asset_id based on your data
        playbackId: slide.video.playback_id,
        video_thumbnail: slide.video_thumbnail, // Pass the video_thumbnail object as is
        type: 'video',
        caption: slide.caption,
        aspectRatio: slide.video.aspect_ratio,
        isInline: slide.isInline,
        isBlackControls: slide.isBlackControls,
        // Include other properties like aspectRatio, isInline if needed
    });
  }     else if (slide._type === 'grid_carousel_module') { // Changed condition here
    slidesData.push({
      _type: 'grid_carousel_module',
      caption: slide.caption,
      columns: slide.columns, // Include column count if necessary
      items: slide.items, // This should be an array of media items
      sizePreset: slide.sizePreset
    });
  }
  // You can extend this logic to handle other media types as well
});

slidesData = [...slidesData];
};

const onSlideChange = (event) => {
  const previousIndex = currentSlideIndex;
  const newIndex = event.detail; // Get the new slide index

  currentSlideIndex = newIndex;

  // Stop and reset the previous video if it exists
  const previousVideoElement = videoElements.get(previousIndex);
  if (previousVideoElement && typeof previousVideoElement.pause === 'function') {
      previousVideoElement.pause();
      previousVideoElement.currentTime = 0;
  }

  const newVideoElement = videoElements.get(newIndex);
  if (newVideoElement && typeof newVideoElement.play === 'function') {
      newVideoElement.play();
  }
};


if (browser) {
  onMount(async () => {
    const module = await import('svelte-carousel');
    CarouselComponent = module.default;
    processSlides();
    isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // console.log('slidesData after processing:', slidesData); // Check the content of slidesData
  });
}
</script>

{#if CarouselComponent}
<section 
id={module._type} 
class="carousel-section"
style={`opacity: ${visible ? 1 : 0}; 
transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
filter: blur(${visible ? '0px' : '2px'});
transform: translateY(${visible ? '0px' : '55px'});`}
use:inView={{ threshold: 0.3 }}
on:enter={() => {
  visible = true;
}}
>
  <svelte:component 
    this={CarouselComponent} 
    bind:this={carousel} 
    autoplay={false}
    swiping={isMobileDevice ? false : false} 
    duration={isMobileDevice ? 0 : 0} 
    dots={false}
    arrows={true}
    on:pageChange={onSlideChange}
    let:showPrevPage
    let:showNextPage
  >
  <div slot="prev" on:click={showPrevPage} on:keydown={showPrevPage} class="custom-arrow custom-arrow-prev" style={customArrowStyle}>
        
  </div>
  {#each slidesData as slide, index}
    <div class="slide">
        {#if slide._type === 'grid_carousel_module'}
            <div class="grid-slide">
              <GridCarouselModule module={slide} isInCarousel={true} />
            </div>
        {:else}
        <div class={slide.type + '-slide'}>
          <MediaSlide media={slide} on:videoElement={e => registerVideoElement(index, e.detail.videoElement)} />
          </div>
        {/if}
    </div>
  {/each}
  <div slot="next" on:click={showNextPage} on:keydown={showNextPage} class="custom-arrow custom-arrow-next" style={customArrowStyle}>
        
  </div>
  </svelte:component>
  <div class="caption">
    {#if slidesData.length > 1}
      <div class="slide-count">
        <div class="current-slide">{currentSlideIndex + 1}</div>
        <div class="slide-separator">/</div>
        <div class="total-slides">{slidesData.length}</div>
      </div>
    {/if}
    <div class="text-captions" class:no-slide-count={!hasMultipleSlides}>
      {#if module.caption}
      <div class="global-caption">{module.caption}</div>
      {/if}
      {#if slidesData[currentSlideIndex]?.caption}
      <div class="slide-caption">{slidesData[currentSlideIndex].caption}</div>
      {/if}
    </div>
      </div>
</section>
{/if}

<style>
.carousel-section {
  position: relative;
  margin: 0 var(--half-space);
  padding: 0 0 var(--full-space) 0;
  max-width: var(--mobile-width-max);
}

.slide {
  overflow: hidden;
  position: relative;
  max-height: var(--mobile-height-max); /* Caps the maximum height */
}

.custom-arrow {
  height: 100%;
  position: absolute;
  display: block;
}

.custom-arrow-next {
  right: 0;
  z-index: 99;
  cursor: e-resize;
  width: calc(75% + 1px);
  height: 93%;
}

.custom-arrow-prev {
  left: 0;
  z-index: 99;
  cursor: w-resize;
  width: 25%;
  height: 93%;
}

.image-slide, .video-slide {
  height: 100%;
  width: 100%;
}

.image-slide {
  position: relative;
  display: inline-flex;
  pointer-events: none;
}

:global(.image-slide img) {
  max-height: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  width: auto !important;
}

.grid-slide {
  /* background: green; */
}

.video-slide {
    display: inline-flex;
}

.caption {
  max-width: var(--max-text-width);
  font-size: var(--font-size);
  text-align: left;
  padding: var(--half-space) 0 0 0;
  display: flex;
  flex-direction: row;
  gap: var(--half-space);
}

.slide-count {
  display: flex;
  flex-direction: row;
  gap: calc(var(--quarter-space) / 2);
}

.current-slide, .total-slides {
  width: auto;
}

.slide-separator {
  width: auto;
}

.text-captions {
  margin-left: calc(var(--full-space) + var(--half-space));
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: var(--half-space);
}

.no-slide-count {
  margin-left: 0;
}

@media (min-width: 768px) {
  .customArrow {
    display: block;
  }
  .slide-separator {
    width: 5px;
  }

  .current-slide, .total-slides {
    width: auto;
  }
}

/* Tablet */
@media (min-width: 800px) {
  .slide {
    max-height: var(--tablet-height-max);
  }
  .carousel-section {
    max-width: calc(var(--tablet-width-max) - var(--half-space));
  }
}

/* Small Desktop */
@media (min-width: 1280px) {
  .slide {
    max-height: var(--desktop-height-max);
  }
  .carousel-section {
    max-width: calc(var(--desktop-width-max) - var(--half-space));
  }
}

/* Desktop */
@media (min-width: 1700px) {
  .slide {
    max-height: var(--large-desktop-height-max);
  }
  .carousel-section {
    max-width: calc(var(--large-desktop-width-max) - var(--half-space));
  }
}

/* Monsters */
@media (min-width: 2500px) {
  .slide {
    max-height: var(--giant-desktop-height-max);
  }

  .carousel-section {
    max-width: calc(var(--giant-desktop-width-max) - var(--half-space));
  }

  .custom-arrow-next {
    width: 85%;
  }

  .custom-arrow-prev {
    width: 15%;
  }
}
</style>
