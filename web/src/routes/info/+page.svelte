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
</script>

<div class="page-container" id="main">
	<section>
		{#if about.description}
			<div class="description intro">
				<Content value={about.description} />
			</div>
		{/if}
	</section>

	<section>
		{#if about.services}
		<h2 class="section-title" id="section_title">Services</h2>
			<div class="services-section">
			{#each about.services as service}
				<div class="service">
					<h3 class="service-title">{service.title}:</h3>
					<div class="service-description">{service.content}</div>
				</div>
			{/each}
			</div>
		{/if}
	</section>

	<section>
		<h2 class="section-title" id="section_title">Contact</h2>
		<div class="contact-section">
			{#if about.contact}
				<div class="email-section">
					{#each about.contact as contact}
						<div class="email-container">
							<h3 class="email-label">{contact.label}:</h3>
							<a class="email-link" href={contact.url} target="_blank" rel="noreferrer">{contact.link_label}</a>
						</div>
					{/each}
				</div>
			{/if}
			{#if about.addresses}
				<div class="address-section" id="addresses">
					{#each about.addresses as address}
						<div class="address-container">
							<div class="location-title">
								{address.location}
							</div>
							<div class="location-details">
								{address.address}
							</div>
						</div>
					{/each}
					</div>
			{/if}
		</div>
	</section>

	{#if about.biography}
		<section>
			<h2 class="section-title" id="section_title">Biography</h2>
			<div class="bio-section">
				<Content value={about.biography} />
			</div>
		</section>
	{/if}
	
	{#if about.collaborators}
		<section>
			<h2 class="section-title" id="section_title">Collaborators</h2>
			<div class="collaborators-section">
				<Content value={about.collaborators} />
			</div>
		</section>
	{/if}
</div>

<style>
:root {
	--paragraph-alignment: left;
	--paragraph-margin: var(--quarter-space) 0 var(--quarter-space) 0;
	--content-p-max-width: 40rem;
	--first-paragraph-margin: 0;
}

@media screen and (min-width: 1024px) {
	:root {
		--paragraph-alignment: left;
		--paragraph-margin: var(--quarter-space) 0 var(--quarter-space) 0;
		--content-p-max-width: 70.5rem;
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
	/* background: red; */
	margin-block-start: 0;
    margin-block-end: 0;
}

section h3 {
	/* background: red; */
	margin-block-start: 0;
    margin-block-end: 0;
}

.section-title, .description{
	padding: var(--half-space);
}

.description {
	/* background: yellow; */
}

.intro {
	width: 90%;
	text-indent: 105px;
	line-height: var(--line-height);
	font-size: var(--font-size);
}

@media (min-width: 800px) {
	.intro {
		width: 80%;
		text-indent: 130px;
	}
}

.bio-section, .collaborators-section, .email-section, .address-section, .services-section {
	padding: 0 var(--half-space) var(--half-space) var(--half-space);
	/* background :yellow; */
}

.services-section	{
	display: flex;
	flex-direction: column;
	gap: var(--half-space);
}

.email-container {
	display: flex;
	flex-direction: row;
	gap: 2px;
}

.email-container a {
	text-decoration: none;
}

.email-container a:hover {
	color: var(--grey);
}

.address-section {
	display: flex;
	gap: var(--half-space);
	flex-direction: column;
}

@media (min-width: 800px) {
	.address-section {
		flex-direction: row;
		gap: var(--full-space);
	}
}

.address-container {
	display: flex;
	flex-direction: column;
}

.location-details {
	white-space: pre-line;
}
</style>
