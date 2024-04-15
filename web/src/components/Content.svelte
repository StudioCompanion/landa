<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import Caption from './Caption.svelte';
	import { page } from '$app/stores'; // Importing the $page store

	export let value: any;

	$: isInfoRoute = $page.url.pathname === '/info';</script>

<div class={isInfoRoute ? 'content info-class' : 'content'}>
	<PortableText
		{value}
		components={{
			block: {
				caption: Caption
			}
		}}
	/>
</div>
