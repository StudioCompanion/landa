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
	<div class="lightbox" transition:fade>
		<button on:click={onClose} class="close">Close</button>
		<button on:click={prevSlide} class="previous"
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
		<button on:click={nextSlide} class="next">
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
		<div class="container">
			{#if images && image}
				{#key imageShowingIndex}
					<img class="image" transition:fade src={image.href} alt={image.caption || ''} />
					<div class="caption" transition:fade>
						{#if image.mainCaption}
							<p>{image.mainCaption}</p>
						{/if}
						{#if image.caption}
							<p>{image.caption}</p>
						{/if}
					</div>
				{/key}
			{/if}
		</div>
	</div>
{/if}

<style>
	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--white);
		z-index: 888;
		padding: 5rem;
	}

	.close {
		position: absolute;
		top: 1rem;
		border: none;
		background-color: transparent;
		right: 1rem;
		font-family: var(--font-serif);
		 
		font-size: var(--font-size-mob-sm);
		transition: color 0.25s ease-in-out;
	}

	.close:hover {
		color: var(--red);
		cursor: pointer;
		transition: color 0.25s ease-in-out;
	}

	@media screen and (min-width: 1024px) {
		.close {
			font-size: var(--font-size);
			top: 2rem;
			right: 2rem;
		}
	}

	.lightbox .container {
		padding: 5rem;
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.lightbox .image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding-bottom: 3rem;
	}

	.caption {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: var(--font-size-mob-sm);
		font-family: var(--font-serif);
		 
		text-align: center;
	}
	
	@media screen and (min-width: 1024px) {
		.caption {
			bottom: 2rem;
			font-size: var(--font-size);
		}

		.close {
			font-size: var(--font-size);
		}
	}

	@media screen and (min-width: 1680px) {
		.caption {
			font-size: var(--font-size-giant-sm);
		}

		.close {
			font-size: var(--font-size-giant-sm);
		}
	}

	.previous {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
	}

	.next {
		z-index: 10;
		border: none;
		background-color: transparent;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}

	.previous svg path, .next svg path {
		transition: stroke 0.25s ease-in-out;
	}

	.previous:hover svg path, .next:hover svg path {
		stroke: var(--red);
		transition: stroke 0.25s ease-in-out;
		cursor: pointer;
	}

	.previous:hover, .next:hover {
		cursor: pointer;
	}
</style>
