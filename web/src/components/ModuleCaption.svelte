<script lang="ts">
	export let caption: string;
</script>

<div class="caption">
	{caption}
</div>

<style>
	.caption {
		max-width: var(--max-text-width-smaller);
		font-size: var(--font-size-small);
		text-align: left;
		padding: var(--half-space) 0 0 0;
		line-height: var(--line-height);
	}
</style>
