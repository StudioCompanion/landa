<script>
	import 'modern-normalize/modern-normalize.css';
	import '../styles/index.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let data;

	$: pathname = data.pathname;
</script>

{#key pathname}

<div class="horizontal-line">
	
</div>

<div class="vertical-line">
	
</div>

<div>
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
{/key}

<style>


	.vertical-line {
		width: 1px; 
		height: 100%;
		position: fixed;
		margin-left: calc(100% - var(--half-space));
		border-left: 1px dashed blue;
		z-index: 999;
		background-color: transparent;
		overflow: hidden;
		pointer-events: none;
		/* display: none; */
	}

	.horizontal-line {
		width: 100%; 
		height: 1px;
		position: fixed;
		margin-top: var(--mobile-height-max);
		z-index: 999;
		background-color: transparent;
		pointer-events: none;
		border-top: 1px dashed blue;
		/* display: none; */
	}

	/* Tablet */
	@media (min-width: 800px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: calc(100% - var(--half-space));
			border-left: 1px dashed blue;
		}

		.horizontal-line {
			margin-top: var(--tablet-height-max);
		}
	}

	/* Small Desktop */
	@media (min-width: 1280px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1197px;
			border-left: 1px dashed blue;
		}
		.horizontal-line {
			margin-top: var(--desktop-height-max);
		}
	}

	/* Desktop */
	@media (min-width: 1700px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1476px;
			border-left: 1px dashed blue;
		}

		.horizontal-line {
			margin-top: var(--large-desktop-height-max);
		}
	}

	/* Monsters */
	@media (min-width: 2500px) {
		.vertical-line {
			width: 1px; 
			height: 100%;
			position: fixed;
			margin-left: 1791px;
			border-left: 1px dashed blue;
		}
		.horizontal-line {
			margin-top: var(--giant-desktop-height-max);
		}
	}

	div {
		background-color: white;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: rgb(255,255,255);
	}
	main {
		flex: 1;
	}

	@media screen and (min-width: 1024px) {
	div {
		/* background: rgb(235,235,235); */
	}
	}

	@media screen and (min-width: 1680px) {
		div {
			/* background: rgb(215,215,215); */
		}
	}

</style>
