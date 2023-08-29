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
		font-size: 1.875rem;
		text-align: center;
		font-style: italic;
	}
	.quote-author {
		font-size: 0.8rem;
		text-align: center;
	}
</style>
