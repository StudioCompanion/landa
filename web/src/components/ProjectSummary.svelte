<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';

	export let project;
	export let index;
	export let homepage = false;
	let visible = false;
	onMount(() => {
		const timeout = setTimeout(() => {
			visible = true;
		}, Math.min(index * 10, 1500));

		return () => {
			clearTimeout(timeout);
		};
	});
	
</script>

<a class={`project-boxlink${visible ? ' visible' : ''}`} href={`/work/${project.slug}`}>
	<div class="project-summary">
		<div class="project-image-container">
			<img
				class="project-image"
				alt="REPLACE"
				{...getImageProps({ image: project.featured_image, maxWidth: 500 })}
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
	}

	.project-boxlink {
		opacity: 0;
		text-decoration: none;
		transition: opacity 1s ease-in-out;
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
		background: blue;
		text-align: center;
	}
	
	.project-title {
		font-size: var(--font-size-m-m);
		font-family: var(--font-serif);
		margin-bottom: 0rem;
	}

	.project-caption {
		font-size: var(--font-size-m-m);
		font-family: var(--font-serif);
	}

	@media screen and (min-width: 1024px) {
		.project-title, .project-caption {
			font-size: var(--font-size-m-d);
		}
	}

	.project-image-container {
		align-items: center;
		display: flex;
		height: auto;
		justify-content: center;
		overflow: hidden;
		width: 100%;
	}

	.project-image {
		height: auto;
		object-fit: contain;
		width: 100%;
	}
</style>
