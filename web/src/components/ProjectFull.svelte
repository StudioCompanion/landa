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
		</div>
		<div class="project-description" id="caption">
			<span class="project-title">{project.title} {#if homepage}<span class="project-caption">{project.caption}</span>{/if}</span>
		</div>
	</div>
</a>

<style>
	.project-summary {
		position: relative;
		border-right: 1px solid var(--grey);
		border-bottom: 1px solid var(--grey);
		padding: 16px;
		box-sizing: content-box; /* Padding is outside the box */
	}
</style>
