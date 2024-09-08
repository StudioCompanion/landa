<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import open from '$lib/assets/Menu.svg';
	import close from '$lib/assets/Close.svg';

	let isMenuOpen = false;

	let scrolled = false;

	onMount(() => {
		
	});
</script>

<header style={`background-color: ${isMenuOpen ? 'white' : 'transparent'};`}>
	<div class="left-wrap">
		<a class="text-link" href="/">Lane & Associates</a>
	</div>
	<div class="menu-icon" on:click={() => isMenuOpen = !isMenuOpen} on:keydown={() => {}}>
		{#if isMenuOpen}
			<img src={close} alt="Close" />
		{:else}
			<img src={open} alt="Menu" />
		{/if}
	</div>
	<div class="right-wrap">
		<a class="text-link" href="/work">Work</a>
		<a class="text-link" href="/info">Info</a>
	</div>
</header>

<!-- Mobile Menu Modal -->
{#if isMenuOpen}
  <div class="mobile-menu">
<div class="close-icon" on:click={() => isMenuOpen = false} on:keydown={() => {}}>
	<img src={close} alt="Close" />
</div>
	<div class="menu-group special" on:keydown={() => {}}>
        <a class="mobile-link" href="/">Lane & Associates</a>
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
		padding: var(--half-space) var(--half-space) 0 var(--half-space);
		z-index: 999;
		font-family: var(--font-serif);
		font-size: var(--font-size);
		line-height: var(--line-height);
		align-items: center;
	}

	.right-wrap {
		column-gap: var(--half-space);
		display: flex;
		flex-direction: row;
		height: 14px;
	}

	.left-wrap {
		display: flex;
		height: 14px;
	}

	@media screen and (min-width: 800px) {
		.left-wrap, .right-wrap {
			height: 20px;
		}
	}

	/* Default Link Styles */
	header a {
		text-decoration: none;
		color: var(--black);
	}

	a:hover {
		color: var(--red);
	}

	/* Specific A Type Styles */
	.mobile-link {
		opacity: 1;
		text-decoration: none;
		display: inline-block;
	}

	.mobile-link:hover {
		color: var(--red);
	}

	.menu-icon:hover, .close-icon:hover {
		opacity: 0.5;
	}

	/* Mobile */
	.menu-icon {
		display: none; /* Hidden by default, shown in mobile view */
		cursor: pointer;
		height: 13px;
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

	.special {
		margin-top: 1px;
		visibility: hidden;
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
