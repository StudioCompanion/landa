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

	const SLIDE_AUTOPLAY_DURATION = 3500;

	let drag = false;
	type CarouselModule = {
		_type: 'carousel_module';
		full_width: boolean;
		autoplay: boolean;
		caption?: string;
		slides: ((MediaType & { _type: 'media' }) | { _type: 'block_slide'; items: MediaType[] })[];
		background_color?: { hex: string };
	};

	let images;
	onMount(() => {
		let timeout = null;

		const handleTimer = () => {
			clearTimeout(timeout);
			if (module.autoplay) {
				timeout = setTimeout(() => {
					next();
				}, SLIDE_AUTOPLAY_DURATION);
			}
		};
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
			handleTimer();
			if (select > 0) {
				select--;
			}
		};

		next = () => {
			slider.next();
			handleTimer();
			if (select >= 0) {
				select++;
			}
		};

		let slideModules = [];
		module.slides.map((slide) => {
			if (slide._type === 'media' && slide.media_type === 'image') {
				const url = imageBuilder.image(slide.image).url();

				slideModules.push({
					// @ts-ignore
					id: slide.image.asset._ref,
					href: url,
					type: 'image',
					caption: slide.caption,
					mainCaption: module.caption
				});
			}

			if (slide._type === 'block_slide') {
				slide.items.map((i) => {
					if (i.media_type === 'image') {
						const url = imageBuilder.image(i.image).url();
						slideModules.push({
							// @ts-ignore
							id: i.image.asset._ref,
							href: url,
							type: 'image',
							caption: i.caption,
							mainCaption: module.caption
						});
					}
				});
			}
		});

		images = slideModules;

		siema.addEventListener('mousedown', () => (drag = false));

		siema.addEventListener('mousemove', () => (drag = true));

		handleTimer();

		return () => {
			siema.removeEventListener('mousedown', () => (drag = false));
			siema.removeEventListener('mousemove', () => (drag = true));
			clearTimeout(timeout);
		};
	});

	let caption = module.caption;
	let visible = false;

	let onClick = (ref) => {
		if (!drag) {
			imageShowingIndex = images.findIndex((i) => i.id === ref);
			show = true;
		}
	};
</script>

<section
	id={module._type}
	style={`opacity: ${visible ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${visible ? '0px' : '55px'});${
		module.background_color ? `background-color: ${module.background_color.hex}` : ''
	}`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
>
	<div id="carousel_container">
		<button on:click={prev} id="carousel_previous"
			><svg
				width="27"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M1 11.5L11.5 22M1 11.5L11.5 0.999999M1 11.5L27 11.5" stroke="#919191" />
			</svg>
		</button>
		<button on:click={next} id="carousel_next">
			<svg
				width="27"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M26 11.5L15.5 1M26 11.5L15.5 22M26 11.5L0 11.5" stroke="#919191" />
			</svg>
		</button>
		<div id="carousel" bind:this={siema}>
			{#if module.slides}
				{#each module.slides as slide, index}
					<div id="slide">
						<div id="inner">
							{#if slide._type === 'media'}
								<Media
									carousel
									media={slide}
									onClick={() => {
										// @ts-ignore
										onClick(slide.image.asset._ref);
									}}
								/>
							{:else if slide._type === 'block_slide'}
								<div id="block">
									{#each slide.items as item}
										<Media
											media={item}
											onClick={() => {
												// @ts-ignore
												onClick(item.image.asset._ref);
											}}
										/>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>

		{#if caption}
			<ModuleCaption {caption} />
		{/if}
	</div>
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
		margin: var(--section-margin-m) auto;
		padding: 0 var(--section-padding-m);
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

	#carousel_container {
		position: relative;
	}

	#carousel_previous {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}
	#carousel_next {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}
</style>
