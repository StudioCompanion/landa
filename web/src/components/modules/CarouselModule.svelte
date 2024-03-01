<script lang="ts">
    import { onMount } from 'svelte';
    import type { Media as MediaType } from '$lib/types';
    import GridModule from './GridModule.svelte'; 
    import { browser } from '$app/environment';

    export let module: CarouselModule;

    let carouselEl;
    let Flickity;

    onMount(async () => {
        if (browser) {
            const FlickityModule = await import('flickity');
            Flickity = FlickityModule.default;

			await import('flickity-fade');

            const flkty = new Flickity(carouselEl, {
				cellAlign: 'left',
				contain: true,
				wrapAround: true,
				fade: true, 
            });
			
			flkty.on('settle', function(index) {
				console.log('Flickity settled at ', index);
			});
        }
    });

    type CarouselModule = {
        _type: 'carousel_module';
        caption?: string;
        slides: (MediaType | GridModule)[];
    };
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css">
	<link rel="stylesheet" href="https://unpkg.com/flickity-fade@2/flickity-fade.css">
</svelte:head>

<section id={module._type} class="carousel-section">
	<div bind:this={carouselEl} class="carousel" data-flickity>
		<div class="carousel-cell">1</div>
		<div class="carousel-cell">2</div>
		<div class="carousel-cell">3</div>
		<div class="carousel-cell">4</div>
		<div class="carousel-cell">5</div>
	  </div>
</section>

<style>

.carousel {
  background: #EEE;
  height: 500px;
  position: relative;
}

.carousel-cell {
  width: 100%;
  height: 100%;
  background: #8C8;
  position: absolute;
  font-size: 80px;
  color: white;
}

/* .carousel-cell {
      opacity: 0 !important;
      transition: opacity 1s ease !important;
    }

	.is-selected {
		opacity: 1 !important;
	} */

</style>