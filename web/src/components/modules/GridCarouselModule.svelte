<script>
	import { onMount } from 'svelte';
	import MediaGrid from '../MediaGrid.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';
  
	export let module;
	export let isInCarousel = false;
  
	const sizePresets = {
	  'twoup': { mobile: 292, tablet: 642, desktop: 640, lgDesktop: 842, giantDesktop: 959 },
	  'threebythree': { mobile: 411, tablet: 796, desktop: 796, lgDesktop: 800, giantDesktop: 954 },
	  'threeup': { mobile: 485, tablet: 974, desktop: 970, lgDesktop: 1278, giantDesktop: 1456 },
	  'default': { mobile: 100, tablet: 120, desktop: 150 },
	};
  
	let currentPresetSize = '100%'; // Default fallback
  
	// This function needs access to `preset`
	function updateSize() {
	  const preset = sizePresets[module.sizePreset || 'default'];
	  const width = window.innerWidth;
  
	  if (width >= 2500) {
		currentPresetSize = `${preset.giantDesktop || preset.desktop}px`;
	  } else if (width >= 1700) {
		currentPresetSize = `${preset.lgDesktop || preset.desktop}px`;
	  } else if (width >= 1280) {
		currentPresetSize = `${preset.desktop}px`;
	  } else if (width >= 800) {
		currentPresetSize = `${preset.tablet}px`;
	  } else {
		currentPresetSize = `${preset.mobile}px`;
	  }
	}
  
	onMount(() => {
	  window.addEventListener('resize', updateSize);
	  // Call updateSize initially to set the correct size from the start
	  updateSize();
	  return () => window.removeEventListener('resize', updateSize);
	});
  </script>
  
  <div class="carousel-container" style={`--carousel-size: ${currentPresetSize};`}>
	<section class={isInCarousel ? 'GridCarouselModule inCarousel' : 'GridCarouselModule'} id={module._type}>
	  <div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr);`}>
		{#each module.items as item}
		  <div class="grid-item">
			<MediaGrid media={item} />
		  </div>
		{/each}
	  </div>
	</section>
  </div>
  
  <style>
	.carousel-container {
	  max-width: var(--carousel-size, 100%);
	}
  
	.GridCarouselModule #grid {
	  display: grid;
	  gap: var(--quarter-space);
	  align-items: center;
	}
  
  </style>
  