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
		class="description" 
		id="description">
			<Content value={about.description} />
		</section>
	{/if}
	<div 
		class="dot" 
		data-dot-index="1"
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			const index = 0; 
			visibilityStore.update(store => {
				store.dots[index] = true;
				return store;
			});
		}}
		style={`opacity: ${$visibilityStore.dots[0] ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.dots[0] ? '0px' : '55px'});`}
	/>

	{#if about.services}
		<section 
		style={`opacity: ${$visibilityStore.services ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.services ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.services = true;
			}}
		class="services">
		<h2 class="section-title" id="section_title">Services</h2>
		{#each about.services as service}
			<div class="service">
				<h3 class="service-title">{service.title}</h3>
				<div class="service-description">{service.content}</div>
			</div>
		{/each}
		</section>
	{/if}
	<div 
		class="dot" 
		data-dot-index="2"
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			const index = 1; 
			visibilityStore.update(store => {
				store.dots[index] = true;
				return store;
			});
		}}
		style={`opacity: ${$visibilityStore.dots[1] ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.dots[1] ? '0px' : '55px'});`}
	/>
	{#if about.logos}
		<div 
		style={`opacity: ${$visibilityStore.logos ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.logos ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.logos = true;
			}}
		class="logo-section" 
		id="logo_grid">
			<h2 class="section-title" id="section_title">{about.clients_title ?? 'Our internation roster'}</h2>
			<div class="grid-container">
				{#each about.logos as logo}
					<div class="logo-container">
						<img class="logo" src={imageBuilder.image(logo).url()} alt="logo" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<div 
		class="dot" 
		data-dot-index="3"
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			const index = 2; 
			visibilityStore.update(store => {
				store.dots[index] = true;
				return store;
			});
		}}
		style={`opacity: ${$visibilityStore.dots[2] ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.dots[2] ? '0px' : '55px'});`}
	/>
	<section
	style={`opacity: ${$visibilityStore.contact ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.contact ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.contact = true;
			}}
	class="contact-section">
		{#if about.contact}
			<section class="email-section" id="description">
				<h2 class="section-title" id="section_title">Contact</h2>
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
	<div 
		class="dot" 
		data-dot-index="4"
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			const index = 3; 
			visibilityStore.update(store => {
				store.dots[index] = true;
				return store;
			});
		}}
		style={`opacity: ${$visibilityStore.dots[3] ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.dots[3] ? '0px' : '55px'});`}
	/>
	{#if about.biography}
		<section 
		style={`opacity: ${$visibilityStore.biography ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.biography ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.biography = true;
			}}
		class="bio-section" 
		id="description">
			<h2 class="section-title" id="section_title">Biography</h2>
			<Content value={about.biography} />
		</section>
	{/if}
	<div 
		class="dot" 
		data-dot-index="5"
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			const index = 4; 
			visibilityStore.update(store => {
				store.dots[index] = true;
				return store;
			});
		}}
		style={`opacity: ${$visibilityStore.dots[4] ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.dots[4] ? '0px' : '55px'});`}
	/>
	{#if about.collaborators}
		<section 
		style={`opacity: ${$visibilityStore.collaborators ? 1 : 0}; 
			transition: opacity .6s ease-in-out, transform .4s ease-in-out;
			transform: translateY(${$visibilityStore.collaborators ? '0px' : '55px'});`}
			use:inView={{ threshold: 0.5 }}
			on:enter={() => {
				$visibilityStore.collaborators = true;
			}}
		class="collaborators-section" 
		id="description">
			<h2 class="section-title" id="section_title">Collaborators</h2>
			<Content value={about.collaborators} />
		</section>
	{/if}
</div>

<style>

	.page-container {
		background-color: var(--red);
		color: var(--white);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rem 0rem 5rem 0rem;
	}

	/* Reused Items */
	.section-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--font-size-mob-lg);
		margin: 0 auto 1rem auto;
		text-align: center;
		width: auto;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background-color: var(--white);
		margin: 2rem 0;
	}

	/* Intro Block */
	.description {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		max-width: 35rem;
		padding: 0 var(--section-padding-m);
	}

	/* Services Block */
	.services {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 var(--section-padding-m);
		font-size: var(--font-size-mob-lg);
	}


	.service {
		margin: 0rem 0 1.5rem 0;
	}

	/* Style the last .service element to have no margin */
	.services .service:last-child {
		margin: 0rem;
	}

	.service-title {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		margin: 0;
		text-align: center;
	}

	.service-description {
		font-family: var(--font-serif-italic);
		font-size: var(--font-size-mob-lg);
		text-align: center;
		max-width: 30rem;
	}

	/* Logo Block */
	.logo-section {
		max-width: var(--max-width);
		padding: 0 var(--section-padding-m);
	}

	.grid-container {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		align-items: center;
		justify-content: center;
		margin: 1rem 0 0 0;
	}

	.logo-container {
		display: flex;
		justify-content: center;
		align-items: center;
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
		text-align: center;
		width: 100%;
		max-width: var(--max-width);
		padding: 0 var(--section-padding-m);
	}

	.email-section {
		margin: 0rem 0rem 2rem 0rem;
	}

	.email-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: center;
	}

	.email-label {
		margin: 0 0.5rem;
		font-size: var(--font-size-mob-lg);
		line-height: 100%;
	}

	.email-link {
		font-family: var(--font-serif-italic);
		font-size: var(--font-size-mob-lg);
		line-height: 100%;
	}

	.email-link:hover {
		text-decoration: none;
	}

	.address-section {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		width: 100%;
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
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		max-width: 35rem;
		padding: 0 var(--section-padding-m);
	}
	
	/* Collaborators */
	.collaborators-section {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-lg);
		max-width: 35rem;
		padding: 0 var(--section-padding-m);
	}

	@media screen and (min-width: 768px){
		.grid-container {
			grid-template-columns: repeat(4, 1fr);
		}
		.address-section {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
	}

	@media screen and (min-width: 1024px) {
		.page-container {
			padding: 7rem 0rem 7rem 0rem;
		}

		.dot {
			margin: 4rem 0;
		}

		.description, .bio-section, .collaborators-section {
			max-width: 70rem;
			font-size: var(--font-size-desk-lg);
			padding: 0 var(--section-padding-d);
		}
		.service-title, .service-description, .section-title, .email-link, .email-label, .location-title, .location-details {
			font-size: var(--font-size-desk-lg);
			max-width: 70rem;
		}
		.grid-container {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
			align-items: center;
			justify-content: center;
		}
		.address-section {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
	}

	@media screen and (min-width: 1920px) {
		.service-title, .service-description, .section-title, .email-link, .email-label, .location-title, .location-details {
			font-size: var(--font-size-giant-lg);
		}
		.description, .bio-section, .collaborators-section {
			font-size: var(--font-size-giant-lg);
		}
	}
</style>
