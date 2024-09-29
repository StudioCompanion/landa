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
			clients: false,
			contact: false,
			biography: false,
			collaborators: false
		},
		dots: Array(5).fill(false) 
	});
	let visible = false;
</script>

<div class="page-container" id="main">
	<section>
		{#if about.description}
			<div class="description intro">
				<Content value={about.description} />
			</div>
		{/if}
	</section>

	<section
	style={`opacity: ${visible ? 1 : 0}; 
		  transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
		  filter: blur(${visible ? '0px' : '2px'});`}
		  use:inView={{ threshold: 0.3 }}
		  on:enter={() => {
			  visible = true;
		  }}>
		<h2 class="section-title" id="section_title">Contact</h2>
		<div class="contact-section">
			{#if about.contact}
				<Content value={about.contact} />
			{/if}
		</div>
	</section>

	<section
	style={`opacity: ${visible ? 1 : 0}; 
		  transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
		  filter: blur(${visible ? '0px' : '2px'});`}
		  use:inView={{ threshold: 0.3 }}
		  on:enter={() => {
			  visible = true;
		  }}>
		{#if about.services}
			<div class="services-section">
				<span class="inline-title" id="section_title">Services</span>
				<Content value={about.services} />
			</div>
		{/if}
	</section>

	

	{#if about.clients}
		<section
		style={`opacity: ${visible ? 1 : 0}; 
		  transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
		  filter: blur(${visible ? '0px' : '2px'});`}
		  use:inView={{ threshold: 0.3 }}
		  on:enter={() => {
			  visible = true;
		  }}>
			<div class="client-section">
				<span class="inline-title" id="section_title">Clients</span>
				<Content value={about.clients} />
			</div>
		</section>
	{/if}
	
	{#if about.collaborators}
		<section
		style={`opacity: ${visible ? 1 : 0}; 
		  transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
		  filter: blur(${visible ? '0px' : '2px'});`}
		  use:inView={{ threshold: 0.3 }}
		  on:enter={() => {
			  visible = true;
		  }}>
			<div class="collaborators-section">
				<span class="inline-title" id="section_title">Collaborators</span>
				<Content value={about.collaborators} />
			</div>
		</section>
	{/if}

	{#if about.biography}
		<section
			style={`opacity: ${visible ? 1 : 0}; 
		  transition: opacity 0.65s ease-in-out, filter 0.25s ease-in-out, transform 0.5s ease-in-out;
		  filter: blur(${visible ? '0px' : '2px'});`}
		  use:inView={{ threshold: 0.3 }}
		  on:enter={() => {
			  visible = true;
		  }}
		  >
			<div class="bio-section">
				<span class="inline-title" id="section_title">David Lane biography</span>
				<Content value={about.biography} />
			</div>
		</section>
	{/if}
</div>

<style>
:root {
	--paragraph-alignment: left;
	--paragraph-margin: var(--quarter-space) 0 var(--quarter-space) 0;
	--first-paragraph-margin: 0;
	--content-p-max-width: 82.8rem;
}

@media screen and (min-width: 1024px) {
	:root {
		--paragraph-alignment: left;
		--paragraph-margin: var(--quarter-space) 0 var(--quarter-space) 0;
		--first-paragraph-margin: 0;
	}
}

#main {
	font-size: var(--font-size);
	line-height: var(--line-height);
}

section {
	border-top: 1px solid var(--grey);
}

#main > section:first-of-type {
        border-top: none;
    }

section h2 {
	margin-block-start: 0;
    margin-block-end: 0;
}

section h3 {
	margin-block-start: 0;
    margin-block-end: 0;
}

.description{
	margin: var(--half-space);
	max-width: var(	--content-p-max-width);
}


.section-title {
	color: var(--black);
	padding: var(--half-space) var(--half-space) 0 var(--half-space);
}

.inline-title {
	color: var(--black);
	display: inline;
}

.intro {
	width: 90%;
	text-indent: 163px;
	line-height: var(--line-height);
	font-size: var(--font-size);
}

@media (min-width: 800px) {
	.intro {
		width: 80%;
		text-indent: 163px;
	}
}

.bio-section, .client-section, .collaborators-section, .services-section {
	padding: var(--half-space) var(--half-space) var(--half-space) var(--half-space);
	max-width: var(	--content-p-max-width);
}

.contact-section {
	padding: 0 var(--half-space) var(--half-space) var(--half-space);
	max-width: var(	--content-p-max-width);
}
:global(.info-class) {
	display: inline;
}

:global(.info-class p) {
	display: inline;
}

.services-section	{
	
}

.email-container {
	display: flex;
	flex-direction: row;
	gap: 2px;
}

:global(.content p a) {
	font-family: var(--font-serif-italic);
	text-decoration: none;
}

:global(.content p a:hover){
	color: var(--red);
}

.address-section {
	
}

@media (min-width: 800px) {
	.address-section {
	}
}

.address-container {
	/* display: flex; */
	/* flex-direction: column; */
}

.location-details {
}
</style>
