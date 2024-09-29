<script lang="ts">
		import { onMount } from 'svelte';
		import inView from '$lib/inView'; 
	import type { Media as MediaType } from '$lib/types';
	import MediaGrid from '../MediaGrid.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';

	type GridModule = {
		_type: 'grid_module';
		columns: number;
		caption?: string;
		items: MediaType[];
	};
	export let module: GridModule;
	export let isInCarousel: boolean = false;

	let visible = false;

	const sizePresets = {
	  'threebythree': { mobile: 411, tablet: 796, desktop: 796, lgDesktop: 800, giantDesktop: 954 },
	  'oneone2c1r': { mobile: 510, tablet: 1120, desktop: 1170, lgDesktop: 1450, giantDesktop: 1710 },
	  'fourfive2c1r': { mobile: 410, tablet: 900, desktop: 1075, lgDesktop: 1219, giantDesktop: 1360},
	  'fourfive3c1r': { mobile: 615, tablet: 1210, desktop: 1170, lgDesktop: 1450, giantDesktop: 1765 },
	  'fourfive4c2r': { mobile: 400, tablet: 905, desktop: 1075, lgDesktop: 1220, giantDesktop: 1375 },
	  'fourfive5c2r': { mobile: 515, tablet: 1135, desktop: 1175, lgDesktop: 1450, giantDesktop: 1720 },
	  'ninesixteen2c1r': { mobile: 285, tablet: 637, desktop: 758, lgDesktop: 860, giantDesktop: 967 },
	  'ninesixteen3c1r': { mobile: 430, tablet: 960, desktop: 1140, lgDesktop: 1295, giantDesktop: 1450 },
	  'sixteennine2c1r': {  mobile: 765, tablet: 1210, desktop: 1200, lgDesktop: 1500, giantDesktop: 1800 },
	  'friezecovers2c1r': { mobile: 385, tablet: 855, desktop: 1015, lgDesktop: 1150, giantDesktop: 1310 },
	  'friezecovers3c1r': { mobile: 580, tablet: 1215, desktop: 1170, lgDesktop: 1450, giantDesktop: 1770 },
	  'friezecampaigns3c1r': { mobile: 590, tablet: 1215, desktop: 1170, lgDesktop: 1450, giantDesktop: 1770 },
	  'gourmand2c1r': { mobile: 350, tablet: 790, desktop: 945, lgDesktop: 1020, giantDesktop: 1150 },
	  'gourmand3c1r': { mobile: 535, tablet: 1185, desktop: 1170, lgDesktop: 1445, giantDesktop: 1730 },
	  'artdirection2c1r': { mobile: 370, tablet: 830, desktop: 990, lgDesktop: 1120, giantDesktop: 1265 },
	  'portraitcampaigns2c1r': { mobile: 355, tablet: 795, desktop: 950, lgDesktop: 1080, giantDesktop: 1210 },
	  'sherman2c2r': { mobile: 360, tablet: 825, desktop: 1000, lgDesktop: 1140, giantDesktop: 1285 },
	};
  
	let currentPresetSize = '100%'; // Default fallback
  
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

	  // Remove 4px if there is only one item
	  if (module.items.length === 1) {
		currentPresetSize = `calc(${currentPresetSize} - 1.3rem)`;
	  }
	}
  
	onMount(() => {
	  window.addEventListener('resize', updateSize);
	  // Call updateSize initially to set the correct size from the start
	  updateSize();
	  return () => window.removeEventListener('resize', updateSize);
	});

</script>

<section 
class={isInCarousel ? 'gridModule inCarousel' : 'gridModule'} 
id={module._type} 
style={`--carousel-size: ${currentPresetSize}; opacity: ${visible ? 1 : 0}; transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out; filter: blur(${visible ? '0px' : '2px'}); transform: translateY(${visible ? '0px' : '55px'});`}
use:inView={{ threshold: 0.3 }}
on:enter={() => {
	visible = true;
}}>
<div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr);`}>
		{#each module.items as item}
			<div class="grid-item">
				<MediaGrid media={item} />
			</div>
		{/each}
	</div>
	{#if module.caption}
		<ModuleCaption caption={module.caption} />
	{/if}
</section>

<style>

	.gridModule {
		max-width: var(--carousel-size, 100%);
		margin: 0 var(--half-space) var(--full-space) var(--half-space);
	}

	#grid {
		width: 100%;
		display: grid;
		gap: var(--quarter-space);
		align-items: center;
	}

	.inCarousel {
		margin: 0;
    }

  /* Tablet */
	@media (min-width: 800px) {
		.gridModule {
			max-width: var(--carousel-size, 100%);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.gridModule {
			max-width: var(--carousel-size, 100%);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.gridModule {
			max-width: var(--carousel-size, 100%);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.gridModule {
			max-width: var(--carousel-size, 100%);
		}
	}

</style>