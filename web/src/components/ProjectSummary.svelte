<script>
	import { getImageProps } from '$lib/sanity';
	import { onMount } from 'svelte';

	export let project;
	export let index;
	export let homepage = false;
	let visible = false;
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, Math.min(index * 10, 1500));
	});
</script>

<a style={`opacity: ${visible ? 1 : 0}; transition: all .3s;`} href={`/work/${project.slug}`}>
	<div id="project">
		<div id="image">
			<img alt="Hello" {...getImageProps({ image: project.featured_image, maxWidth: 500 })} />
		</div>

		<div id="title">
			<h2>{project.title}</h2>
			{#if homepage}<span>{project.caption}</span>{/if}
		</div>
	</div></a
>

<style>
	#project {
		text-align: center;
		color: var(--black);
	}
	a {
		text-decoration: none;
	}

	#projects a:hover h2 {
		border-bottom: solid 1px black;
	}

	#project #title {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#project h2 {
		display: inline-block;
		margin-bottom: 0.5rem;
		border-bottom: solid 1px transparent;
	}

	#project #image {
		aspect-ratio: 5/3;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#project #image img {
		height: 100%;
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}
</style>
