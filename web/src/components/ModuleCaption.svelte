<script lang="ts">
	export let caption: string;
</script>

<div class="caption">
	{caption}
</div>

<style>
	.caption {
		font-family: var(--font-serif);
		font-size: var(--font-size-s-m);
		text-align: center;
		padding: 1rem 0 0 0;
	}

	@media screen and (min-width: 1024px) {
		.caption {
			font-family: var(--font-serif);
			font-size: var(--font-size-s-d);
			padding: 1.5rem 0 0 0;
		}
	}
</style>
