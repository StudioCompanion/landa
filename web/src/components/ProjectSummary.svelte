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

<a class="work-box{visible ? ' visible' : ''}" href={`/work/${project.slug}`}>
	<div class="project-summary" id="square">
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
			<span class="project-title">{project.title}</span>
		</div>
	</div>
</a>

<style>
	.project-summary {
		position: relative;
		border-right: 1px solid var(--grey);
		border-bottom: 1px solid var(--grey);
		box-sizing: content-box; /* Padding is outside the box */
	}

	.project-summary::before {
		content: "";
		display: block;
		padding-top: 100%; /* This forces the container to maintain a square shape */
	}

	.work-box {
		opacity: 0;
		text-decoration: none;
		transition: opacity 1s ease-in-out;
	}

	.work-box.visible {
		opacity: 1;
	}

	.work-box:hover .project-title {
		color: var(--grey);
	}

	.project-description {
		text-align: left;
		color: black;
		max-width: 40rem;
		padding: var(--half-space);
		display: none;
	}

	.project-description .content p {
		text-align: left;
	}
	
	.project-title {
		font-size: var(--font-size-mob-lg);
		font-family: var(--font-serif);
		margin: 0 auto;
		transition: color 0.35s ease-in-out;
	}

	.project-image-container {
		position: absolute;
		top: var(--half-space); /* Offset by padding */
		left: var(--half-space);
		right: var(--half-space);
		bottom: calc(var(--half-space) + 0px); /* Adjust for padding and estimated caption height */
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
	}

	.project-image {
		max-width: 100%;
		max-height: 100%;
		display: block;
		object-fit: contain;
		width: auto;
		height: auto;
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
			position: absolute;
			top: var(--half-space); /* Offset by padding */
			left: var(--half-space);
			right: var(--half-space);
			bottom: calc(var(--half-space) + 40px); /* Adjust for padding and estimated caption height */
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-direction: column;
		}

		.project-image {
			max-width: 100%;
			max-height: 95%;
			display: block;
			object-fit: contain;
			width: auto;
			height: auto;
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
			top: var(--half-space);
			left: var(--half-space);
			right: var(--half-space);
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
			top: var(--half-space);
			left: var(--half-space);
			right: var(--half-space);
			bottom: calc(var(--half-space) + 40px);
		}
	}
</style>
