<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import Caption from './Caption.svelte';
	export let value: any;
</script>

<span class="inline-content">
	<PortableText
		{value}
		components={{
			block: {
				caption: Caption
			}
		}}
	/>
</span>
