<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import open from '$lib/assets/Menu.svg';
	import close from '$lib/assets/Close.svg';

	let isMenuOpen = false;

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
</script>

<header style="opacity: {headerOpacity}; transition: opacity 400ms;">
	<div class="left-wrap">
		<a class="text-link" href="/">Lane & Associates</a>
	</div>
	<div class="menu-icon" on:click={() => isMenuOpen = !isMenuOpen}>
	    <img src={open} alt="Menu" />
	</div>
	<div class="right-wrap">
		<a class="text-link" href="/work">Work</a>
		<a class="text-link" href="/info">Info</a>
	</div>
</header>

<!-- Mobile Menu Modal -->
{#if isMenuOpen}
  <div class="mobile-menu">
    <div class="close-icon" on:click={() => isMenuOpen = false}>
        <img src={close} alt="Close" />
    </div>
	<div class="menu-group special">
        <a class="mobile-link" href="/special">Lane & Associates</a>
    </div>
    <div class="menu-group">
        <a class="mobile-link" href="/work">Work</a>
        <a class="mobile-link" href="/info">Info</a>
    </div>
  </div>
{/if}

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: var(--half-space) var(--half-space) var(--half-space) var(--half-space);
		z-index: 50;
		font-family: var(--font-serif);
		font-size: var(--font-size);
		line-height: var(--line-height);
	}

	.right-wrap {
		column-gap: 1rem;
		display: flex;
		flex-direction: row;
	}

	.left-wrap {
		display: flex;
	}

	/* Default Link Styles */
	header a {
		text-decoration: none;
		color: var(--black);
		transition: color 0.4s ease-out;
	}

	a:hover {
		color: var(--grey);
		transition: color 0.4s ease-out;
	}

	/* Specific A Type Styles */
	.mobile-link {
		opacity: 1;
		text-decoration: none;
		display: inline-block;
		transition: color 0.4s ease-out;
	}

	.mobile-link:hover {
		color: var(--grey);
		transition: color 0.4s ease-out;
	}

	.menu-icon, .close-icon {
		transition: opacity 0.4s ease-out;
	}

	.menu-icon:hover, .close-icon:hover {
		opacity: 0.5;
		transition: opacity 0.4s ease-out;
	}

	/* Mobile */
	.menu-icon {
		display: none; /* Hidden by default, shown in mobile view */
		cursor: pointer;
	}

	.close-icon {
		cursor: pointer;
		position: absolute;
		top: var(--half-space);
		right: var(--half-space);
	}

	.mobile-menu {
        display: flex;
        flex-direction: column;
        align-items: start;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 100;
        padding: var(--half-space);
        text-align: left;
    }

    .mobile-menu .menu-group {
        display: flex;
        flex-direction: column;
        margin-bottom: var(--half-space); /* Space between groups */
    }

	/* Adjust visibility based on screen size */
	@media (max-width: 800px) {
		.menu-icon {
			display: block; /* Show menu icon on mobile */
		}
		
		.right-wrap {
			display: none; /* Hide desktop links on mobile */
		}
	}
</style>
