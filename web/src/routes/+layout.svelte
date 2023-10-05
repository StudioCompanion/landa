<script>
	import 'modern-normalize/modern-normalize.css';
	import '../styles/index.css';
	import { fade } from 'svelte/transition';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let data;

	$: pathname = data.pathname;
</script>

{#key pathname}
	<div in:fade={{ duration: 200, delay: 0 }}>
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
{/key}

<style>
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
		background: rgb(235,235,235);
	}
	}

	@media screen and (min-width: 1680px) {
		div {
			background: rgb(215,215,215);
		}
	}

</style>
