<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import inView from '$lib/inView';

	export let project;
	export let index;
	export let homepage = false;

	let visible = false;
	onMount(() => {
			const timeout = setTimeout(() => {
				visible = true;
			}, Math.min(index * 100, 2500));

			return () => {
				clearTimeout(timeout);
			};
	});

	let { src, srcset, sizes, width, height, imageType } = getImageProps({ image: project.featured_image, maxWidth: 2000 });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="project-container">
	<a class="project-summary" href={`/work/${project.slug}`}>
		<div class="project-image-container" id="image-container">
			<img
				class={`project-image ${imageType}`}
				alt="ALT NAME REPLACE"
				src={src}
				srcset={srcset}
				sizes={sizes}
				width={width}
				height={height}
			/>
		</div>
		<div class="project-description" id="caption">
			<span class="project-title">{project.title}</span> <span class="project-caption">{project.caption}</span>
		</div>
	</a>
</div>

<style>
	.project-container {
		padding: var(--half-space);
		border-top: 1px solid var(--grey);
	}
	
	.project-summary {
		position: relative;
		display: inline-flex; /* Changed from 'block' to 'inline-flex' */
		flex-direction: column; /* Ensures child elements (image and description) are stacked vertically */
		align-items: flex-start; /* Aligns child elements to the start, preventing unnecessary stretching */
		gap: var(--half-space);
	}

	.project-image-container {
		overflow: hidden; /* Keeps existing overflow behavior */
		display: flex; /* Keeps the flex display */
		justify-content: left; /* Aligns the image to the left, can be 'flex-start' for consistency */
		align-items: flex-start; /* Aligns the image to the top */
	}

	.project-image-container img {
		max-height: var(--mobile-height-max); /* Maximum height for the image */
		height: auto; /* Ensures height adjusts based on width while maintaining aspect ratio */
		width: auto; /* Ensures width adjusts to maintain the image's aspect ratio */
		max-width: 100%; /* Ensures image does not exceed the width of its container */
	}

	.project-description {
		max-width: var(--content-p-max-width);
		font-size: var(--font-size);
		line-height: var(--line-height);
	}

	a {
		text-decoration: none;
	}

	a:hover {
		color: var(--grey);
	}


	/* Tablet */
	@media (min-width: 800px) {
		.project-image-container img {
			max-height: var(--tablet-height-max);
		}
		.project-description {
			font-size: var(--font-size);
			line-height: var(--line-height);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.project-image-container img {
			max-height: var(--desktop-height-max);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.project-image-container img {
			max-height: var(--large-desktop-height-max);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.project-image-container img {
			max-height: var(--giant-desktop-height-max);
		}
	}
	
</style>
