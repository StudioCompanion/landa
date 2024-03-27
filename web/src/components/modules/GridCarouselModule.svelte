<script>
	import { onMount } from 'svelte';
	import MediaGrid from '../MediaGrid.svelte';
  
	export let module;
	export let isInCarousel = false;
  
	const sizePresets = {
	  'twoup': { mobile: 400, tablet: 800, desktop: 795, lgDesktop: 842, giantDesktop: 959 },
	  'threebythree': { mobile: 411, tablet: 796, desktop: 796, lgDesktop: 800, giantDesktop: 954 },
	  'threeup': { mobile: 600, tablet: 1200, desktop: 1195, lgDesktop: 1278, giantDesktop: 1456 },
	  'twolandscape': { mobile: 775, tablet: 1200, desktop: 1200, lgDesktop: 1500, giantDesktop: 1800 },
	  '4col2row': { mobile: 375, tablet: 750, desktop: 745, lgDesktop: 973, giantDesktop: 1300 },
	  'default': { mobile: 100, tablet: 120, desktop: 150 },
	  'oneone2c1r': { mobile: 510, tablet: 1120, desktop: 1170, lgDesktop: 1450, giantDesktop: 1710 },
	  'fourfive2c1r': { mobile: 410, tablet: 900, desktop: 1075, lgDesktop: 1219, giantDesktop: 1360},
	  'fourfive3c1r': { mobile: 615, tablet: 1210, desktop: 1170, lgDesktop: 1450, giantDesktop: 1765 },
	  'fourfive4c2r': { mobile: 400, tablet: 905, desktop: 1075, lgDesktop: 1220, giantDesktop: 1375 },
	  'fourfive5c2r': { mobile: 515, tablet: 1135, desktop: 1175, lgDesktop: 1450, giantDesktop: 1720 },
	  'ninesixteen2c1r': { mobile: 285, tablet: 637, desktop: 758, lgDesktop: 860, giantDesktop: 967 },
	  'ninesixteen3c1r': { mobile: 430, tablet: 960, desktop: 1140, lgDesktop: 1298, giantDesktop: 967 },
	  'sixteennine2c1r': {  mobile: 765, tablet: 1210, desktop: 1200, lgDesktop: 1500, giantDesktop: 1800 },
	  'friezecovers2c1r': { mobile: 385, tablet: 855, desktop: 1015, lgDesktop: 1150, giantDesktop: 100 },
	  'friezecovers3c1r': { mobile: 580, tablet: 1215, desktop: 1170, lgDesktop: 1450, giantDesktop: 100 },
	  'friezecampaigns3c1r': { mobile: 590, tablet: 1215, desktop: 1170, lgDesktop: 1450, giantDesktop: 100 },
	  'gourmand2c1r': { mobile: 350, tablet: 790, desktop: 945, lgDesktop: 1020, giantDesktop: 100 },
	  'gourmand3c1r': { mobile: 535, tablet: 1185, desktop: 1170, lgDesktop: 1445, giantDesktop: 100 },
	  'artdirection2c1r': { mobile: 370, tablet: 830, desktop: 990, lgDesktop: 1120, giantDesktop: 100 },
	  'portraitcampaigns2c1r': { mobile: 355, tablet: 795, desktop: 950, lgDesktop: 1080, giantDesktop: 100 },
	  'sherman2c2r': { mobile: 360, tablet: 825, desktop: 1000, lgDesktop: 1140, giantDesktop: 100 },
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
	  /* background: red; */
	}

	/* Tablet */
	@media (min-width: 800px) {
		.carousel-container {
			/* background: blue; */
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.carousel-container {
			/* background: green; */
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.carousel-container {
			/* background: yellow; */
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.carousel-container	{
			/* background: purple; */
		}		
	}
  
	.GridCarouselModule #grid {
	  display: grid;
	  gap: var(--quarter-space);
	  align-items: center;
	}
  
  </style>
  