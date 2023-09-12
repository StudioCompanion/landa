<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import Caption from './Caption.svelte';
	export let value: any;
</script>

<div class="content">
	<PortableText
		{value}
		components={{
			block: {
				caption: Caption
			}
		}}
	/>
</div>
