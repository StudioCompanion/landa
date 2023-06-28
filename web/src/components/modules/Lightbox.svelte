<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let show: boolean = false;
	export let images: any = [];
	export let onClose: any;
	export let imageShowingIndex = 0;
	$: console.log(imageShowingIndex);
	$: image = images[imageShowingIndex];

	const nextSlide = () => {
		if (imageShowingIndex === images.length - 1) {
			imageShowingIndex = 0;
		} else {
			imageShowingIndex += 1;
		}
	};

	const prevSlide = () => {
		if (imageShowingIndex === 0) {
			imageShowingIndex = images.length - 1;
		} else {
			imageShowingIndex -= 1;
		}
	};

	onMount(() => {
		let listener = (e) => {
			if (e.key === 'Escape' && onClose) {
				onClose();
			}

			if (e.key === 'ArrowLeft') {
				prevSlide();
			}

			if (e.key === 'ArrowRight') {
				nextSlide();
			}
		};

		window.addEventListener('keyup', listener, { passive: true });

		return () => {
			window.removeEventListener('keyup', listener);
		};
	});
</script>

{#if show}
	<div id="lightbox" transition:fade>
		<button on:click={prevSlide} id="previous">Previous</button>
		<button on:click={nextSlide} id="next">Next</button>
		<div id="container">
			{#if images && image}
				{#key imageShowingIndex}
					<img id="image" transition:fade src={image.href} alt={image.alt} />
				{/key}
			{/if}
		</div>
	</div>
{/if}

<style>
	#lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--white);
		z-index: 888;
		padding: 5rem;
	}

	#next {
		position: absolute;
		top: 50%;
		right: 1rem;
		z-index: 999;
		transform: translateY(-50%);
	}

	#previous {
		position: absolute;
		top: 50%;
		left: 1rem;
		z-index: 999;
		transform: translateY(-50%);
	}

	#lightbox #container {
		padding: 5rem;
		width: 100%;
		height: 100%;
		position: relative;
	}

	#lightbox #image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
