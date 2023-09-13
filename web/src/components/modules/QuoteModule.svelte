<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	type QuoteModule = {
		_type: 'quote_module';
		quote: any;
		full_name: string;
		job_title: string;
	};

	export let module: QuoteModule;
</script>

<section id={module._type}>
	<blockquote>
		<PortableText value={module.quote} />
	</blockquote>
	<div class="quote-author">
		{module.full_name}
		<br />
		{module.job_title}
	</div>
</section>

<style>
	blockquote {
		font-family: var(--font-display-italic);
		font-size: var(--font-size-l-m);
		text-align: center;
		max-width: 35rem;
		padding: 0 var(--section-padding-m);
		margin: 0 auto;
	}

	.quote-author {
		font-family: var(--font-serif);
		font-size: var(--font-size-s-m);
		margin: 1rem 0 0 0;
		text-align: center;
	}

	@media (min-width: 1024px) {
		blockquote {
			font-size: var(--font-size-l-d);
			max-width: 60rem;
			padding: 0 var(--section-padding-d);
		}
		.quote-author {
			font-size: var(--font-size-s-d);
		}
	}

</style>
