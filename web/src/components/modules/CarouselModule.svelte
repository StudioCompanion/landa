<script lang="ts">
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

  console.log('Initial module.slides data:', module.slides); // Log 1: Initial data

const processSlides = () => {
  console.log('processSlides function is called');
  module.slides.forEach((slide, index) => {
    console.log(`Processing slide ${index}:`, slide); // Log each slide being processed

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
          id: slide.video.asset_id, // Assuming this should be asset_id based on your data
          playbackId: slide.video.playback_id,
          video_thumbnail: slide.video_thumbnail, // Pass the video_thumbnail object as is
          type: 'video',
          caption: slide.caption,
          aspectRatio: slide.video.aspect_ratio,
          isInline: slide.isInline,
          // Include other properties like aspectRatio, isInline if needed
      });
    }     else if (slide._type === 'grid_carousel_module') { // Changed condition here
      slidesData.push({
        _type: 'grid_carousel_module',
        caption: slide.caption,
        columns: slide.columns, // Include column count if necessary
        items: slide.items, // This should be an array of media items
        maxHeight: slide.maxHeight, // Ensure maxHeight is included here
        sizePreset: slide.sizePreset
      });
    }
    // You can extend this logic to handle other media types as well
  });

  slidesData = [...slidesData];
  console.log('Processed slidesData:', slidesData); // Log the final slidesData array
};

  const onSlideChange = (event) => {
    currentSlideIndex = event.detail; // Use event.detail to get the current page index
    // console.log(`Current slide index changed to: ${currentSlideIndex}`); // Log the current slide index for debugging
  };

  if (browser) {
    onMount(async () => {
      const module = await import('svelte-carousel');
      CarouselComponent = module.default;
      processSlides();
      console.log('slidesData after processing:', slidesData); // Check the content of slidesData
    });
  }
</script>

{#if CarouselComponent}
  <section id={module._type} class="carousel-section">
    <svelte:component 
      this={CarouselComponent} 
      bind:this={carousel} 
      autoplay={false}
      swiping={false}
      duration={0}
      dots={false}
      arrows={true}
      on:pageChange={onSlideChange}
      let:showPrevPage
      let:showNextPage
    >
    <div slot="prev" on:click={showPrevPage} class="custom-arrow custom-arrow-prev">
      
    </div>
    {#each slidesData as slide, index}
      <div class="slide">
          {#if slide._type === 'grid_carousel_module'}
              <div class="grid-slide">
                <GridCarouselModule module={slide} isInCarousel={true} />
              </div>
          {:else}
              <div class={slide.type + '-slide'}>
                <MediaSlide media={slide} />
              </div>
          {/if}
      </div>
    {/each}
    <div slot="next" on:click={showNextPage} class="custom-arrow custom-arrow-next">
      
    </div>
    </svelte:component>
    <div class="caption">
      <div class="slide-count">
        <div class="current-slide">{currentSlideIndex + 1}</div>
        <div class="slide-separator">of</div>
        <div class="total-slides">{slidesData.length}</div>
      </div>
      <div class="global-caption">{module.caption}</div>
      <div class="slide-caption">{slidesData[currentSlideIndex]?.caption}</div>
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
    background: red;
  }

  .custom-arrow {
    height: 100%;
    position: absolute;
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
  }

  :global(.image-slide img) {
    max-height: 100%;
    max-width: 100%;
    height: auto;
    width: auto;
  }

  .grid-slide {
    /* background: green; */
  }

  .video-slide {
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
    gap: 0.25rem;
  }

  .current-slide, .total-slides {
    width: 8px;
  }

  .slide-separator {
    width: 13px;
  }

  @media (min-width: 768px) {
    .slide-separator {
      width: 16px;
    }

    .current-slide, .total-slides {
      width: 10px;
    }
  }

  /* Tablet */
	@media (min-width: 800px) {
		.slide {
			max-height: var(--tablet-height-max);
		}
    .carousel-section {
      max-width: var(--tablet-width-max);
    }
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.slide {
			max-height: var(--desktop-height-max);
		}
    .carousel-section {
      max-width: var(--desktop-width-max);
    }
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.slide {
			max-height: var(--large-desktop-height-max);
		}
    .carousel-section {
      max-width: var(--large-desktop-width-max);
    }
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.slide {
			max-height: var(--giant-desktop-height-max);
		}

    .carousel-section {
      max-width: var(--giant-desktop-width-max);
    }

    .custom-arrow-next {
      width: 85%;
    }

    .custom-arrow-prev {
      width: 15%;
    }
	}
</style>
