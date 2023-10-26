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

<a class={`project-boxlink${visible ? ' visible' : ''}`} href={`/work/${project.slug}`}>
	<div class="project-summary" id="square">
		<div class="project-image-container" id="image-container">
			<img
				class:work-route-class={$page.route.id === '/work'}
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
		border-right: 1px solid #B0B0B0;
		border-bottom: 1px solid #B0B0B0;
		padding: 16px;
		box-sizing: content-box; /* Padding is outside the box */
		}

	.project-summary::before {
		content: "";
		display: block;
		padding-top: 100%; /* This forces the container to maintain a square shape */
	}

	.project-boxlink {
		opacity: 0;
		text-decoration: none;
		transition: opacity 1s ease-in-out;
		/* background: pink; */
	}

	.project-boxlink.visible {
		opacity: 1;
	}

	.project-boxlink:hover .project-title, .project-boxlink:hover .project-caption {
		color: var(--red);
	}

	.project-title, .project-caption {
		transition: color 0.35s ease-in-out;
	}

	.project-description {
		margin-top: 12px;
		text-align: left;
		color: black;
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
			max-width: 30rem;
		}
	}

	@media screen and (min-width: 1680px) {
		.project-title, .project-caption {
			font-size: var(--font-size-giant-sm);
			max-width: 40rem;
		}
	}

	.project-image-container {
		position: absolute;
		top: 32px; /* Offset by padding */
		left: 32px;
		right: 32px;
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
		/* padding: 5%; */
	}

	.portrait {
    padding: 5px;
		background: lightgreen;
	}

	.landscape {
	padding: 5px;
		background: lightcoral;
	}

	.square {
	padding: 5px;
		background: lightblue;
	}



	.work-route-class {
		max-height: 325px;
	}

	/* One square per row: No right border on any square */
	@media (min-width: 320px) {
		.project-boxlink .project-summary {
			border-right: 1px solid transparent;
			/* background: pink; */
		}
	}

	/* Two squares per row: No right border on every 2nd square */
	@media (min-width: 1024px) {
		.project-boxlink .project-summary {
			border-right: 1px solid #B0B0B0;
			/* background: yellow; */
		}
		.project-boxlink:nth-of-type(2n) .project-summary {
			border-right: 1px solid transparent;
			/* background: pink; */
		}
	}

	/* Three squares per row: No right border on every 2nd square */
	@media (min-width: 1680px) {
		.project-boxlink .project-summary {
			border-right: 1px solid #B0B0B0;
			/* background: yellow; */
		}
		.project-boxlink:nth-of-type(2n) .project-summary {
			border-right: 1px solid #B0B0B0;
			/* background: pink; */
		}
		.project-boxlink:nth-of-type(3n) .project-summary {
			border-right: 1px solid transparent;
			/* background: lightblue; */
		}
	}

	/* @media (min-width: 320px) {
		.project-boxlink:nth-last-of-type(1) .project-summary {
			background: pink;
		}
	}

	@media (min-width: 1680px) {
		.project-boxlink:nth-last-of-type(-n+2) .project-summary {
			background: lightblue;
		}
	}

	@media (min-width: 1920px) {
		.project-boxlink:nth-last-of-type(-n+3) .project-summary {
			background: orange;
		}
	} */


</style>
