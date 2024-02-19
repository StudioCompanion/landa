<script lang="ts">
	import inView from '$lib/inView'; 
	import { PortableText } from '@portabletext/svelte';

	type QuoteModule = {
		_type: 'quote_module';
		quote: any;
		full_name: string;
		job_title: string;
	};

	let visible = false;

	export let module: QuoteModule;
</script>

<section 
	id={module._type}
	style={`opacity: ${visible ? 1 : 0}; 
		transition: opacity .6s ease-in-out, transform .4s ease-in-out;
		transform: translateY(${visible ? '0px' : '55px'});`}
		use:inView={{ threshold: 0.5 }}
		on:enter={() => {
			visible = true;
		}}
	use:inView={{ threshold: 0.5 }}
	on:enter={() => {
		visible = true;
	}}
>
	<blockquote>
		<PortableText value={module.quote} />
	</blockquote>
	<div class="quote-author">
		{#if module.full_name}
			{module.full_name}	
			<br />					
		{/if}
		{#if module.job_title}
			{module.job_title}
		{/if}
	</div>
</section>

<style>
	blockquote {
		font-family: var(--font-serif-italic);
		font-size: var(--font-size-mob-lg);
		text-align: center;
		max-width: 35rem;
		padding: 0 var(--section-padding-m);
		margin: 0 auto;
	}

	.quote-author {
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-sm);
		margin: 1rem 0 0 0;
		text-align: center;
	}

	@media (min-width: 1024px) {
		blockquote {
			font-size: var(--font-size-desktop);
			max-width: 60rem;
			padding: 0 var(--section-padding-d);
		}
		.quote-author {
			font-size: var(--font-size-desktop);
		}
	}

</style>
