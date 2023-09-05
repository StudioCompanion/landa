<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let show: boolean = false;
	export let images: any = [];
	export let onClose: any;
	export let imageShowingIndex = 0;

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
		<button on:click={onClose} id="close">Close</button>
		<button on:click={prevSlide} id="previous"
			><svg
				width="27"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M1 11.5L11.5 22M1 11.5L11.5 0.999999M1 11.5L27 11.5" stroke="#919191" />
			</svg></button
		>
		<button on:click={nextSlide} id="next">
			<svg
				width="27"
				height="23"
				viewBox="0 0 27 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M26 11.5L15.5 1M26 11.5L15.5 22M26 11.5L0 11.5" stroke="#919191" />
			</svg></button
		>
		<div id="container">
			{#if images && image}
				{#key imageShowingIndex}
					<img id="image" transition:fade src={image.href} alt={image.caption || ''} />
					<div id="caption" transition:fade style="text-align:center;">
						{image.caption || ''}
					</div>
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

	#close {
		position: absolute;
		top: 1rem;
		border: none;
		background-color: transparent;
		right: 1rem;
	}

	#lightbox #container {
		padding: 5rem;
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	#lightbox #image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding-bottom: 3rem;
	}

	#caption {
		position: absolute;
		bottom: 0rem;
		left: 50%;
		transform: translateX(-50%);
	}

	#previous {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}
	#next {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}
</style>
