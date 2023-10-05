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
	
</script>

<a 

class={`project-boxlink${visible ? ' visible' : ''}`} href={`/work/${project.slug}`}>
	<div class="project-summary">
		<div class="project-image-container">
			<img
			class:work-route-class={$page.route.id === '/work'}
			class="project-image" 
				alt="REPLACE"
				{...getImageProps({ image: project.featured_image, maxWidth: 2000 })}
			/>
		</div>

		<div class="project-description">
			<h2 class="project-title">{project.title}</h2>
			{#if homepage}<span class="project-caption">{project.caption}</span>{/if}
		</div>
	</div>
</a>

<style>
	.project-summary {
		color: var(--black);
    text-align: center;
    font-family: var(--font-serif);
    aspect-ratio: 1 / 1;
    /* background: yellow; */
    overflow: hidden;
	display: flex;                       /* Change to flex */
    flex-direction: column;              /* Stack children vertically */
    justify-content: center;             /* Center children vertically */
    align-items: center;                 /* Center children horizontally */
}

	.project-boxlink {
		opacity: 0;
		text-decoration: none;
		transition: opacity 1s ease-in-out;
		/* background: pink; */
		aspect-ratio: 1 / 1;
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
		text-align: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.project-description .content p {
		text-align: center;
	}
	
	.project-title {
		font-size: var(--font-size-mob-lg);
		font-family: var(--font-serif);
		 
		margin-bottom: 0rem;
		padding: 0rem 1rem;
	}

	.project-caption {
		font-size: var(--font-size-mob-sm);
		font-family: var(--font-serif);
		padding: 0rem 1rem;
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
		display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    /* border: 1px solid black; */
	/* background: green; */
	}

	.project-image {
    max-width: 100%;       /* Landscape images will be constrained by width */
    max-height: 100%;      /* Portrait images will be constrained by height */
    object-fit: contain;   /* Maintain aspect ratio of the image */
    /* border: 1px solid red; */
    display: block;
    width: auto;           /* Remove any explicit width for the image */
    height: auto;          /* Remove any explicit height for the image */
}


	.work-route-class {
		max-height: 325px;
	}
</style>
