<script lang="ts">
	import type { Media as MediaType } from '$lib/types';
	import Siema from 'siema';
	import { onMount } from 'svelte';
	import Media from '../Media.svelte';
	import ModuleCaption from '../ModuleCaption.svelte';
	import inView from '$lib/inView';
	import { imageBuilder } from '$lib/sanity';
	import Lightbox from './Lightbox.svelte';

	export let module: CarouselModule;
	let show = false;
	let imageShowingIndex = 0;
	let siema: any, slider: any, prev, next;
	let select = 0;
	type CarouselModule = {
		_type: 'carousel_module';
		full_width: boolean;
		autoplay: boolean;
		caption?: string;
		slides: ((MediaType & { _type: 'media' }) | { _type: 'block_slide'; items: MediaType[] })[];
	};

	let images;
	onMount(() => {
		slider = new Siema({
			selector: siema,
			duration: 200,
			easing: 'ease-in-out',
			perPage: 1,
			startIndex: 0,
			draggable: true,
			multipleDrag: true,
			threshold: 20,
			loop: true
		});
		prev = () => {
			slider.prev();
			if (select > 0) {
				select--;
			}
		};

		next = () => {
			slider.next();
			if (select >= 0) {
				select++;
			}
		};

		let slideModules = [];
		module.slides.map((slide) => {
			if (slide._type === 'media' && slide.media_type === 'image') {
				const url = imageBuilder.image(slide.image).url();
				slideModules.push({
					href: url,
					type: 'image',
					alt: module.caption
				});
			}
		});

		images = slideModules;
	});

	let caption = module.caption;
	let visible = false;
</script>

<section
	id={module._type}
	style={`opacity: ${visible ? 1 : 0}; transition: all .5s ease-out;`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
>
	<div id="carousel" bind:this={siema}>
		{#each module.slides as slide, index}
			<div
				id="slide"
				on:click={() => {
					imageShowingIndex = index;
					show = true;
				}}
			>
				<div id="inner">
					{#if slide._type === 'media'}
						<Media carousel media={slide} />
					{:else if slide._type === 'block_slide'}
						<div id="block">
							{#each slide.items as item}
								<Media media={item} />
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if caption}
		<ModuleCaption {caption} />
	{/if}
</section>
<Lightbox
	{show}
	onClose={() => {
		show = false;
	}}
	{imageShowingIndex}
	{images}
/>

<style>
	#grid {
		width: 100%;
		display: grid;
		gap: 2rem;
		align-items: center;
	}

	section {
		margin: var(--section-margin) auto;
		padding: 0 var(--section-padding);
	}

	#slide {
		margin: 0 auto;
		max-width: var(--max-width);
		aspect-ratio: 5/3;
		width: 100%;
	}

	#inner {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#block {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
</style>
