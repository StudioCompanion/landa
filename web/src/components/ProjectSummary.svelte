<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Image } from "@unpic/svelte";

	let imageLoaded = false;

	function handleImageLoad() {
		imageLoaded = true;
	}

	export let project;
	export let index;

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

<a class="work-box{visible ? ' visible' : ''}" href={`/work/${project.slug}`}>
	<div class="project-summary" id="square">
		<div class="project-image-container" class:image-loaded={imageLoaded} >
				<Image
					class="project-image"
					src={project.featured_image.asset.url}  
					layout="constrained"
					width={project.featured_image.asset.metadata.dimensions.width}
					aspectRatio={project.featured_image.asset.metadata.dimensions.aspectRatio}
					background="#FFFFFF"
					on:load={handleImageLoad}
					sizes="(max-width: 640px) 640px, (max-width: 750px) 750px, (max-width: 828px) 828px, (max-width: 960px) 960px, (max-width: 1080px) 1080px, (max-width: 1280px) 1280px, (max-width: 1668px) 1668px, (max-width: 1920px) 1920px, (max-width: 2048px) 2048px, (max-width: 2560px) 2560px, (max-width: 3200px) 3200px, (max-width: 3840px) 3840px, (max-width: 4480px) 4480px, (max-width: 5120px) 5120px, (max-width: 6016px) 6016px, 100vw"
					alt={project.featured_image.asset.altText}
				/>	
			</div>
		<div class="project-description" id="caption">
			<span class="project-title">{project.title}</span>
		</div>
	</div>
</a>

<style>


	.image-loaded {
		
	}

	:global(.project-image) {
		opacity: 0;
		transition: opacity 1s;
	}

	.image-loaded :global(.project-image){
		opacity: 1;
		transition: opacity 1s;
	}

	.project-summary {
		position: relative;
		border-right: 1px solid var(--grey);
		border-bottom: 1px solid var(--grey);
		box-sizing: content-box; /* Padding is outside the box */
	}

	.work-box {
		opacity: 0;
		text-decoration: none;
		filter: blur(4px);
		transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out;
	}

	.work-box.visible {
		opacity: 1;
		filter: blur(0px);
		transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out;
	}

	.work-box:hover .project-title {
		color: var(--red);
	}

	.project-description {
		text-align: left;
		color: var(--black);
		padding: var(--half-space);
		display: none;
	}

	.project-title {
		font-size: var(--font-size-mob-lg);
		font-family: var(--font-serif);
		margin: 0 auto;
		color: var(--black);
	}

	.project-summary::before {
			content: "";
			display: block;
			padding-top: 100%; /* This forces the container to maintain a square shape */
		}

	.project-image-container {
		position: absolute;
    top: var(--half-space);
    left: var(--half-space);
    right: var(--half-space);
    bottom: calc(var(--half-space) + 0px);
    display: flex;
    align-items: start;
    justify-content: start;
	}

	:global(.project-image) {
		object-fit: contain !important;
	object-position: left !important;
		width: fit-content !important;
    max-width: 100% !important;
    max-height: calc(100% - var(--full-space)) !important;
	}

	.work-box .project-summary {
		border-right: 1px solid var(--grey);
	}

	.work-box:nth-of-type(2n) .project-summary {
		border-right: 0px solid transparent;
		margin-top: -1px;
	}

	.work-box:nth-of-type(2n) .project-summary {
		border-right: 1px solid var(--grey);
		margin-top: 0px;
	}

	/* Tablet and Desktop */
	@media (min-width: 800px) {
		.project-image-container {
			
		}

		:global(.project-image) {
			
		}

		.project-description {
			position: absolute;
			bottom: 0px;
			left: 0px;
			right: 0px;
			display: block;
		}

		.project-summary::before {
			content: "";
			display: block;
			padding-top: 100%; /* This forces the container to maintain a square shape */
		}

		.work-box .project-summary {
			border-right: 1px solid var(--grey);
		}

		.work-box:nth-of-type(2n) .project-summary {
			border-right: 1px solid var(--grey);
			margin-top: 0px;
		}

		.work-box:nth-of-type(4n) .project-summary {
			border-right: 0px solid transparent;
			margin-top: -1px;
		}

		.project-image-container {
			
		}
	}

	@media (min-width: 1280px) {
		.work-box:nth-of-type(4n) .project-summary {
			border-right: 1px solid var(--grey);
			margin-top: 0px;
		}
		.work-box:nth-of-type(5n) .project-summary {
			border-right: 1px solid var(--grey);
			/* margin-top: -1px; */
		}
	}

	/* Large Desktop */
	@media (min-width: 1700px) {
		/* .work-box:nth-of-type(4n) .project-summary {
			border-right: 1px solid transparent;
			margin-top: 0px;
		}
		.work-box:nth-of-type(5n) .project-summary {
			border-right: 1px solid var(--grey);
			margin-top: -1px;
		} */
		.project-image-container {
			
		}
	}
</style>
