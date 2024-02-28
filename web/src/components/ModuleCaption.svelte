<script lang="ts">
	export let caption: string;
</script>

<div class="caption">
	{caption}
</div>

<style>
	.caption {
		max-width: var(--max-text-width);
		font-size: var(--font-size);
		text-align: left;
		padding: var(--half-space) 0 0 0;
	}
</style>
