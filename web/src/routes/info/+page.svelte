<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Content from '../../components/Content.svelte';
	import Media from '../../components/Media.svelte';
	import { imageBuilder } from '$lib/sanity';
	let root;

	export let data;
	const { about } = data;

	onMount(() => {
		if (document) {
			root = document.querySelector(':root');
			root?.style.setProperty('--logo-color', 'white');
		}
	});

	onDestroy(() => {
		root?.style.setProperty('--logo-color', 'black');
	});
</script>

<div id="main">
	{#if about.description}
		<section id="description">
			<Content value={about.description} />
		</section>
	{/if}
	<div id="dot" />

	{#if about.services}
		<h2 id="section_title">Services</h2>
		{#each about.services as service}
			<div id="service">
				<h3>{service.title}</h3>
				<span>{service.content}</span>
			</div>
		{/each}
	{/if}
	<div id="dot" />
	{#if about.logos}
		<h2 id="section_title">{about.clients_title ?? 'Our internation roster'}</h2>
		<div id="logo_grid">
			{#each about.logos as logo}
				<div>
					<img src={imageBuilder.image(logo).url()} alt="logo" />
				</div>
			{/each}
		</div>
	{/if}
	<div id="dot" />
	{#if about.contact}
		<section id="description">
			<h2 id="section_title">Contact</h2>
			{#each about.contact as contact}
				<div id="contact_link">
					<h3>{contact.label}</h3>
					<a href={contact.url} target="_blank" rel="noreferrer">{contact.link_label}</a>
				</div>
			{/each}
		</section>
	{/if}
	<div id="dot" />
	{#if about.addresses}
		<section id="addresses">
			{#each about.addresses as address}
				<div id="address">
					<div><strong>{address.location}</strong></div>
					{address.address}
				</div>
			{/each}
		</section>
	{/if}
	<div id="dot" />
	{#if about.biography}
		<section id="description">
			<h2 id="section_title">Biography</h2>
			<Content value={about.biography} />
		</section>
	{/if}
	<div id="dot" />
	{#if about.collaborators}
		<section id="description">
			<h2 id="section_title">Collaborators</h2>
			<Content value={about.collaborators} />
		</section>
	{/if}
</div>

<style>
	#description,
	div#main,
	#section_title {
		font-size: 20px;
		padding: 0 1rem;
	}

	#description {
		text-align: center;

		font-family: JJannon;
		max-width: 876px;
		letter-spacing: -0.48px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background-color: var(--white);
		margin: 2rem 0;
	}
	div#main {
		background-color: var(--red);
		color: var(--white);
		padding-top: 5rem;

		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 5rem;
	}

	#section_title {
		text-align: center;
		font-family: var(--font-display);
		font-weight: 600;
		line-height: 115%;
		letter-spacing: -0.48px;
	}

	#service {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 0.5rem;
	}

	#service h3 {
		text-align: center;

		font-family: var(--font-display);
		font-weight: 700;
		line-height: 115%;
		letter-spacing: -0.48px;
		font-style: italic;
		margin-bottom: 0;
	}

	#service span {
		display: block;
		font-family: var(--font-display);
		font-style: italic;
		line-height: 125%;
		max-width: 55ch;
	}

	#logo_grid {
		margin-top: 2rem;
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}

	#logo_grid > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#logo_grid > div > img {
		width: 100%;
		height: auto;
	}

	#contact_link a {
		color: var(--white);
		font-style: italic;
	}

	#contact_link {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 20px;
		margin-bottom: 2rem;
	}

	#contact_link h3 {
		margin: 0;
		padding: 0;

		font-size: 20px;
	}
	#addresses {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		width: 100%;
	}
	#address {
		text-align: center;
		word-break: break-all;
		white-space: pre-line;
		margin-bottom: 2rem;
	}

	@media screen and (min-width: 1024px) {
		#description,
		div#main,
		#section_title,
		#contact_link,
		#contact_link h3 {
			font-size: 24px;
		}

		#logo_grid {
			grid-template-columns: repeat(4, 1fr);
		}

		#contact_link {
			flex-direction: row;
			gap: 1rem;
		}

		#addresses {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
