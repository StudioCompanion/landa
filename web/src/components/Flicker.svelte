<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { animate } from 'framer-motion';
	import Cookies from 'js-cookie';
	export let images;
	let visible = 1;
	let countdown = 1000;
	let hideImages = false;
	let hide = false;
	let loaderVisible = false;

	const altRun = () => {
		hideImages = false;
		// The below was ported from the original animation
		animate(0, 80, {
			type: 'tween',
			duration: 10,
			ease: [0.25, 0.03, 0.84, 0],
			onComplete: () => {
				hideImages = true;
				setTimeout(() => {
					hide = true;
					Cookies.set('splashscreen', false);
				}, 50);
				// Re-enable scrolling once the animation is complete
				document.body.style.overflow = 'auto'; 
			},
			onUpdate: (v) => {
				visible = Math.floor(v);
			}
		});
	};

	const preload = async () => {
		const processedImages = images.images.map((image) => getImageProps({ image, maxWidth: 2000 }));
		const promises = [];
		processedImages.forEach(({ src }) => {
			promises.push(
				new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = () => {
						resolve();
					};
					img.onerror = () => {
						reject();
					};
					img.src = src;
				})
			);
		});
		await Promise.all(promises);
	};

	let timeout = new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 3000);
	});

	onMount(() => {
		// Disable scrolling
		document.body.style.overflow = 'hidden';

		loaderVisible = true;
		// Wait for the timeout and the preload to finish, whichever takes longer
		Promise.all([timeout, preload()]).then(() => {
			loaderVisible = false;
			altRun();
		});
	});
</script>

{#if !hide}
	<div out:fade class="splashscreen">
		<div class="splashscreen-inner">
			{#if !hideImages}
				<div in:fade>
					{#each images.images as image, index}
						<img
							alt=""
							src={getImageProps({ image: image, maxWidth: 2000 }).src}
							class={`splash-image${
								visible % images.images.length === index && !hideImages ? ' visible' : ''
							}`}
						/>
					{/each}
				</div>
			{/if}
		</div>

		{#if loaderVisible}
		<div in:fade>
			<svg class="loading-circle" viewBox="0 0 100 100">
				<circle cx="50" cy="50" r="45" />
			</svg>
		</div>
		{/if}
	</div>
{/if}

<style>
	.splashscreen {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
		width: 100vw;
		height: 100vh;
		background-color: var(--white);
	}

	.splashscreen-inner {
		padding: 127px var(--half-space);
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* Tablet */
	@media (min-width: 800px) {
		.splashscreen-inner {
			padding: 134px var(--half-space);
		}
	} 

	.splash-image {
		position: absolute;
		width: auto;
		display: none;
		max-width: 70%;
		max-height: 70%;
	}

	.loading-circle {
        position: absolute;
        width: var(--quarter-space);
        height: auto;
        bottom: var(--half-space);
		left: var(--half-space);
        fill: white;
        stroke-width: 0;
        animation: pulse 3s infinite ease-in-out;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.25;
        }
    }

	.splash-image.visible {
		display: block;
	}
</style>
