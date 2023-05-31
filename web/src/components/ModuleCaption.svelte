<script lang="ts">
	export let caption: string;
</script>

<div class="caption">
	{caption}
</div>

<style>
	.caption {
		font-size: 0.8rem;
		text-align: center;
		padding: 2rem 0 0 0;
	}

	@media screen and (min-width: 1024px) {
		.caption {
			font-size: 1.185rem;
		}
	}
</style>
