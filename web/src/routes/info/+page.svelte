<script lang="ts">
	import inView from '$lib/inView';
	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import Content from '../../components/Content.svelte';
	import Media from '../../components/Media.svelte';
	import { imageBuilder } from '$lib/sanity';
	let root;

	export let data;
	const { about } = data;

	const visibilityStore = writable({
		sections: {
			description: false,
			services: false,
			logos: false,
			contact: false,
			biography: false,
			collaborators: false
		},
		dots: Array(5).fill(false) 
	});

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

<div class="page-container" id="main">
	{#if about.description}
		<section 
		style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.description = true;
			}}
		class="description section" 
		id="description">
			<Content value={about.description} />
		</section>
	{/if}

	{#if about.services}
	<h2 style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		$visibilityStore.description = true;
	}} class="section-title" id="section_title">Services</h2>
		<section 
		style={`opacity: ${$visibilityStore.services ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.services ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.services = true;
			}}
		class="services section">
		{#each about.services as service}
			<div class="service">
				<h3 class="service-title">{service.title}</h3>
				<div class="service-description">{service.content}</div>
			</div>
		{/each}
		</section>
	{/if}
	{#if about.logos}
	<h2 style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		$visibilityStore.description = true;
	}} class="section-title" id="section_title">{about.clients_title ?? 'Our internation roster'}</h2>
		<div 
		style={`opacity: ${$visibilityStore.logos ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.logos ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.logos = true;
			}}
		class="logo-section section" 
		id="logo_grid">
			<div class="grid-container">
				{#each about.logos as logo}
					<div class="logo-container">
						<img class="logo" src={imageBuilder.image(logo).url()} alt="logo" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<h2 style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		$visibilityStore.description = true;
	}} class="section-title" id="section_title">Contact</h2>
	<section
	style={`opacity: ${$visibilityStore.contact ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.contact ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.contact = true;
			}}
	class="contact-section section">
		{#if about.contact}
			<section class="email-section" id="description">
				{#each about.contact as contact}
					<div class="email-container">
						<h3 class="email-label">{contact.label}</h3>
						<a class="email-link" href={contact.url} target="_blank" rel="noreferrer">{contact.link_label}</a>
					</div>
				{/each}
			</section>
		{/if}
		{#if about.addresses}
			<section class="address-section" id="addresses">
				{#each about.addresses as address}
					<div class="address-container">
						<div class="location-title">
							<strong>{address.location}</strong>
						</div>
						<div class="location-details">
							{address.address}
						</div>
					</div>
				{/each}
			</section>
		{/if}
	</section>
	{#if about.biography}
	<h2 style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		$visibilityStore.description = true;
	}} class="section-title" id="section_title">Biography</h2>
		<section 
		style={`opacity: ${$visibilityStore.biography ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.biography ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.biography = true;
			}}
		class="bio-section section" 
		id="description">
			<Content value={about.biography} />
		</section>
	{/if}
	{#if about.collaborators}
	<h2 style={`opacity: ${$visibilityStore.description ? 1 : 0}; 
	transition: opacity .6s ease-in-out, transform .4s ease-in-out;
	transform: translateY(${$visibilityStore.description ? '0px' : '55px'});`}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		$visibilityStore.description = true;
	}} class="section-title" id="section_title">Collaborators</h2>
		<section 
		style={`opacity: ${$visibilityStore.collaborators ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.collaborators ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.collaborators = true;
			}}
		class="collaborators-section section" 
		id="description">
			<Content value={about.collaborators} />
		</section>
	{/if}
</div>

<style>

:root {
	--paragraph-alignment: left;
	--paragraph-margin: 1rem 0 0 0;
}


	.page-container {
		background-color: var(--red);
		color: var(--white);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* padding: 5rem 0rem 5rem 0rem; */
	}

	.section {
		width: 100%;
		border-top: 1px solid white;
	}

	.description {
		margin-top: 4rem;
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
	}

	/* Reused Items */
	.section-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		margin: 0 auto 0 auto;
		text-align: left;
		width: 100%;
		border-top: 1px solid white;
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-sm) var(--pad-desk-lg);
	}

	/* Intro Block */
	.description {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
	}

	/* Services Block */
	.services {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: stretch;
		font-size: var(--font-size-mob-lg);
	}

	.service {
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
		/* margin: 0rem 0 1.5rem 0; */
		border: 1px solid white;
	}

	/* Style the last .service element to have no margin */
	.services .service:last-child {
		margin: 0rem;
	}

	.service-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		margin: 0;
		text-align: left;
	}

	.service-description {
		font-family: var(--font-serif-italic);
		font-size: var(--font-size-mob-lg);
		text-align: left;
	}

	/* Logo Block */
	.logo-section {
		/* max-width: var(--max-width); */
	}

	.grid-container {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, 1fr);
		/* gap: 1rem; */
		align-items: center;
		justify-content: center;
	}

	.logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid white;
	}

	.logo {
		width: 100%;
		height: auto;
		padding: 5px;
	}

	/* Contact Block */

	.contact-section {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		text-align: left;
		width: 100%;
	}

	.email-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border: 1px solid white;
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
	}

	.email-section .email-container:last-of-type {
		margin: 0;
	}

	.email-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: center;
		margin: 0 0 0.25rem 0;
	}

	.email-label {
		font-size: var(--font-size-mob-lg);
		line-height: 100%;
		margin: 0;
	}

	.email-link {
		font-family: var(--font-serif-italic);
		font-size: var(--font-size-mob-lg);
		line-height: 100%;
		margin-left: 0.5rem;
	}

	.email-link:hover {
		text-decoration: none;
	}

	.address-section {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		width: 100%;
	}

	.address-container {
		border: 1px solid white;
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
	}

	.location-title {
		font-family: var(--font-serif-bold);
		font-size: var(--font-size-mob-lg);
	}

	.location-details {
		font-family: var(--font-serif-italic);
		word-break: break-all;
		white-space: pre-line;
		font-size: var(--font-size-mob-lg);
	}

	/* Biography */
	.bio-section {
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
	}
	
	/* Collaborators */
	.collaborators-section {
		padding: var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg) var(--pad-desk-lg);
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
	}

	@media screen and (min-width: 768px){
		.grid-container {
			grid-template-columns: repeat(4, 1fr);
		}
		.address-section {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1024px) {
		.page-container {
			/* padding: 7rem 0rem 7rem 0rem; */
		}

		.dot {
			margin: 4rem 0;
		}

		.description, .bio-section, .collaborators-section {
			font-size: var(--font-size-desk-lg);
		}
		.service-title, .service-description, .section-title, .email-link, .email-label, .location-title, .location-details {
			font-size: var(--font-size-desk-lg);
		}
		.grid-container {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(4, 1fr);
			align-items: center;
			justify-content: center;
		}
		.address-section {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1680px) {
		.service-title, .service-description, .section-title, .email-link, .email-label, .location-title, .location-details {
			font-size: var(--font-size-giant-lg);
		}
		.description, .bio-section, .collaborators-section {
			font-size: var(--font-size-giant-lg);
		}
	}
</style>
