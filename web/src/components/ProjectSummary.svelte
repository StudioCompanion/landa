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
				alt="Hello"
				{...getImageProps({ image: project.featured_image, maxWidth: 500 })}
			/>
		</div>

		<div class="project-description">
			<h2 class="project-title">{project.title}</h2>
			{#if homepage}<span>{project.caption}</span>{/if}
		</div>
	</div></a
>

<style>
	.project-summary {
		color: var(--black);
		text-align: center;
	}
	.project-boxlink {
		opacity: 0;
		text-decoration: none;
		transition: opacity 0.3s;
	}

	.project-boxlink.visible {
		opacity: 1;
	}

	.project-boxlink:hover .project-title {
		border-bottom: solid 1px black;
	}

	.project-description {
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.project-title {
		border-bottom: solid 1px transparent;
		display: inline-block;
		margin-bottom: 0.5rem;
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
