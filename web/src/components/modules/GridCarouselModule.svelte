<script lang="ts">
    import { onMount } from 'svelte';
    import inView from '$lib/inView';
    import type { Media as MediaType } from '$lib/types';
    import MediaGrid from '../MediaGrid.svelte';
    import ModuleCaption from '../ModuleCaption.svelte';

    type GridCarouselModule = {
        _type: 'grid_carousel_module';
        columns: number;
        caption?: string;
        items: MediaType[];
        sizePreset?: string;
    };
    export let module: GridCarouselModule;
    export let isInCarousel: boolean = false;

    // Example preset values for different sizes
    const sizePresets = {
        'twoup': { mobile: 300, tablet: 120, desktop: 150 },
        'threebythree': { mobile: 200, tablet: 240, desktop: 300 },
        'threeup': { mobile: 300, tablet: 360, desktop: 450 },
        'default': { mobile: 100, tablet: 120, desktop: 150 },
    };

    let preset = sizePresets[module.sizePreset || 'default'];
</script>

<section 
    class={isInCarousel ? 'GridCarouselModule inCarousel' : 'GridCarouselModule'} 
    id={module._type} 
    style={`${module.sizePreset && module.sizePreset !== 'default' ? `max-width: ${preset.mobile}px;` : ''}`}>
    <div id="grid" style={`grid-template-columns: repeat(${module.columns ?? 3}, 1fr);`}>
        {#each module.items as item}
            <div class="grid-item">
                <MediaGrid media={item} />
            </div>
        {/each}
    </div>
</section>

<style>

	.GridCarouselModule {
		/* max-width: var(--mobile-width-max); */
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
</style>