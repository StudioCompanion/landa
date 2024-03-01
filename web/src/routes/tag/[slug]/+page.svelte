<script>
	import { onMount } from 'svelte';
	
	onMount(() => {
	  // Redirect to home page or another page
	  window.location.href = '/';
	});
  </script>

<!-- <script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { imageBuilder } from '$lib/sanity';
	import ProjectSummaryList from '../../../components/ProjectSummaryList.svelte';
	export let data;
	let root;
</script> -->

<!-- <svelte:head> -->
	<!-- HTML Meta Tags -->
	<!-- <title>{data.tag.name} | Lane & Associates</title>
	<meta name="description" content={data.settings.seo_description} /> -->

	<!-- Facebook Meta Tags -->
	<!-- <meta property="og:url" content={data.settings.canonical_url + '/work/' + data.slug} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${data.tag.name} | Lane & Associates`} />
	<meta property="og:description" content={data.tag.description} />
	<meta
		property="og:image"
		content={data.tag.projects && data.tag.projects.length > 0
			? imageBuilder
					.image(data.tag.projects[0].featured_image)
					.width(1600)
					.height(900)
					.fit('fill')
					.url()
			: ''}
	/> -->

	<!-- Twitter Meta Tags -->
	<!-- <meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={data.settings.canonical_url} />
	<meta property="twitter:url" content={data.settings.canonical_url + '/work/' + data.slug} />
	<meta name="twitter:title" content={`${data.tag.name} | Lane & Associates`} />
	<meta name="twitter:description" content={data.tag.description} />
	<meta
		name="twitter:image"
		content={data.tag.projects && data.tag.projects.length > 0
			? imageBuilder
					.image(data.tag.projects[0].featured_image)
					.width(1600)
					.height(900)
					.fit('fill')
					.url()
			: ''}
	/> -->
<!-- </svelte:head> -->

<!-- <section class="tag-details">
	{#if data.tag.name}
		<h2 class="tag-name">{data.tag.name}</h2>
	{/if}
	{#if data.tag.description}
		<p class="tag-description">{data.tag.description}</p>
	{/if}
</section>
<ProjectSummaryList projects={data.tag.projects} /> -->

<!-- <style>
	.tag-details {
		margin: 5.75rem auto 2.75rem auto;
		max-width: 45rem;
		padding: 0 var(--section-padding-m);
		text-align: center;
	}

	.tag-name {
		font-size: var(--font-size-mob-lg);
		font-family: var(--font-serif);
		margin: 0 auto 0.25rem auto;
	}

	.tag-description {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
	}

	@media screen and (min-width: 1024px) {
		.tag-details, .tag-name, .tag-description {
			font-size: var(--font-size);
		}
	}

	@media screen and (min-width: 1680px) {
		.tag-details, .tag-name, .tag-description {
			font-size: var(--font-size-giant-lg);
		}
	}
</style> -->
