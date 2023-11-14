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

<a class={$page.route.id === '/work' 
	? `work-box${visible ? ' visible' : ''}` 
	: `project-boxlink${visible ? ' visible' : ''}`
	} href={`/work/${project.slug}`}>
	<div class="project-summary" id="square">
		<div class="project-image-container" id="image-container">
			<img
				class={`project-image ${imageType}`}
				alt="REPLACE"
				src={src}
				srcset={srcset}
				sizes={sizes}
				width={width}
				height={height}
			/>
			<div class="project-description" id="caption">
				<span class="project-title">{project.title} {#if homepage}<span class="project-caption">{project.caption}</span>{/if}</span>
			</div>
		</div>
	</div>
</a>

<style>
	.project-summary {
		position: relative;
		border-right: 1px solid var(--light-grey);
		border-bottom: 1px solid var(--light-grey);
		padding: 16px;
		box-sizing: content-box; /* Padding is outside the box */
	}

	.project-summary::before {
		content: "";
		display: block;
		padding-top: 0; /* This forces the container to maintain a square shape */
	}

	.project-boxlink, .work-box {
		opacity: 0;
		text-decoration: none;
		transition: opacity 1s ease-in-out;
		/* background: pink; */
	}

	.project-boxlink.visible, .work-box.visible {
		opacity: 1;
	}

	.project-boxlink:hover .project-title, .project-boxlink:hover .project-caption, .work-box:hover .project-title, .work-box:hover .project-caption {
		color: var(--red);
	}

	.project-title, .project-caption {
		transition: color 0.35s ease-in-out;
	}

	.project-description {
		margin-top: 12px;
		text-align: left;
		color: black;
		max-width: 40rem;
	}

	.project-description .content p {
		text-align: left;
	}
	
	.project-title {
		font-size: var(--font-size-mob-lg);
		font-family: var(--font-serif);
		margin: 0 auto;
		/* margin-bottom: 0rem; */
		/* padding: 0rem 1rem; */
	}

	.project-caption {
		font-size: var(--font-size-mob-sm);
		font-family: var(--font-serif);
		color: #919191;
		/* padding: 0rem 1rem; */
	}

	@media screen and (min-width: 1024px) {
		.project-title, .project-caption {
			font-size: var(--font-size-desk-sm);
		}

		.project-description {
			max-width: 30rem;
		}
	}

	@media screen and (min-width: 1680px) {
		.project-title, .project-caption {
			font-size: var(--font-size-giant-sm);
		}
		.project-description {
			max-width: 40rem;
		}
	}

	.project-image-container {
		position: relative;
		top: 0px; /* Offset by padding */
		left: 0px;
		right: 0px;
		bottom: 0px; /* Adjust for padding and estimated caption height */
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

	.portrait {
		background: lightgreen;
	}

	.landscape {
		background: lightcoral;
	}

	.square {
		background: lightblue;
	}

	.work-box .project-summary {
		border-right: 1px solid var(--light-grey);
	}

	.work-box:nth-of-type(2n) .project-summary {
		border-right: 0px solid transparent;
		margin-top: -1px;
	}

	/* HOME */
	@media (min-width: 320px) {
		.project-boxlink .project-summary {
			border-right: 1px solid transparent;
		}
		.project-boxlink:nth-last-of-type(1) .project-summary {
			border-bottom: 1px solid transparent;
		}
	}

	@media (min-width: 1024px) {
		.project-image-container {
			position: absolute;
			top: 20px; /* Offset by padding */
			left: 20px;
			right: 20px;
			bottom: calc(16px + 40px); /* Adjust for padding and estimated caption height */
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

		.project-summary::before {
			content: "";
			display: block;
			padding-top: 100%; /* This forces the container to maintain a square shape */
		}

		.project-boxlink .project-summary, .work-box .project-summary {
			border-right: 1px solid var(--light-grey);
		}
		.project-boxlink:nth-of-type(2n) .project-summary {
			border-right: 1px solid transparent;
		}

		.work-box:nth-of-type(2n) .project-summary {
			border-right: 1px solid var(--light-grey);
			margin-top: 0px;
		}

		.work-box:nth-of-type(4n) .project-summary {
			border-right: 0px solid transparent;
			margin-top: -1px;
		}

		.project-image-container {
			top: 32px;
			left: 32px;
			right: 32px;
		}
		.project-boxlink:nth-last-of-type(-n+2) .project-summary {
			/* border-bottom: 1px solid transparent; */
		}
	}

	@media (min-width: 1500px) {
		.project-boxlink .project-summary {
			border-right: 1px solid var(--light-grey);
		}
		.project-boxlink:nth-of-type(2n) .project-summary {
			border-right: 1px solid var(--light-grey);
		}
		.project-boxlink:nth-of-type(3n) .project-summary {
			border-right: 1px solid transparent;
		}
		.work-box:nth-of-type(4n) .project-summary {
			border-right: 1px solid var(--light-grey);
			margin-top: 0px;
		}
		.work-box:nth-of-type(5n) .project-summary {
			border-right: 0px solid transparent;
			margin-top: -1px;
		}
		.project-image-container {
			top: 32px;
			left: 32px;
			right: 32px;
			bottom: calc(16px + 60px);
		}
		.project-boxlink:nth-last-of-type(-n+3) .project-summary {
			/* border-bottom: 1px solid transparent; */
		}
	}
</style>
