<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let headerOpacity = 0;
	let scrolled = false;

	onMount(() => {
		setTimeout(() => {
			headerOpacity = 1; // Transition to full opacity
		}, 0); // Adjust timing as needed

		const handleScroll = () => {
			// Checks if the page has been scrolled slightly
			scrolled = window.scrollY < 25;
		};

		// Adds event listener
		window.addEventListener('scroll', handleScroll);
		
		// Fire to check initial value
		handleScroll();

		return () => {
			// Cleanup component is destroyed
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let isInfoPage = false;
	$: isInfoPage = $page.route.id === '/info';
</script>

<header style="opacity: {headerOpacity}; transition: opacity 400ms;" class:globalScrolled={$page.route.id !== '/' && scrolled} class:scrolled={$page.route.id === '/' && scrolled} class:infoScrolled={$page.route.id === '/info'}>
	<div class="left-wrap">
		<a class="text-link" href="/">Lane & Associates</a>
	</div>
	<div class="right-wrap">
		<a class="text-link" href="/work">Work</a>
		<a class="text-link" href="/info">Info</a>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 2.4rem var(--half-space) var(--half-space) var(--half-space);
		z-index: 50;
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-sm);
		background: white;
		border-bottom: 1px solid var(--grey);
		transition: all 0.1s ease-out;
	}

	.right-wrap {
		column-gap: 1rem;
		display: flex;
		flex-direction: row;
		height: 20px;
		line-height: 100%;
	}

	.left-wrap {
		height: 20px;
		line-height: 100%;
	}

	/* Default Link Styles */
	header a {
		text-decoration: none;
		color: var(--logo-color);
		transition: color 0.4s ease-out;
	}

	a:hover {
		color: var(--grey);
		transition: color 0.4s ease-out;
	}

	/* Specific A Type Styles */
	.text-link {
		opacity: 1;
		line-height: 160%;
		transition: all 0.4s ease-out;
	}

	/* Dealing with the logo positioning on root animation */
	.scrolled .text-link {
		/* opacity: 0; */
	}

	.scrolled .logo {
		/* transform: translateY(3rem); */
	}

	.scrolled {
		background: none;
		/* border-bottom: 1px solid transparent; */
	}

	.globalScrolled {
		/* background: none; */
		/* border-bottom: 1px solid transparent; */
	}
</style>
