<script>
	import { onMount } from 'svelte';
	let date = new Date().getFullYear();

	let footerOpacity = 0; // Initial opacity

	onMount(() => {
		setTimeout(() => {
		footerOpacity = 1; // Transition to full opacity
	}, 0); // Adjust timing as needed
	});
</script>

<footer style="opacity: {footerOpacity}; transition: opacity 400ms;">
	<nav>
		<a href="/work">Work</a>
		<a href="/info">Info</a>
		<a href="mailto:studio@laneandassociates.co">Contact</a>
		<a href="mailto:careers@laneandassociates.co">Careers</a>
		<a href="https://www.instagram.com/lane_and_associates/" target="_blank" rel="noreferrer"
			>Instagram</a
		>
	</nav>
	<div>
		&copy; Lane & Associates {date}
	</div>
</footer>

<style>
	footer {
		background-color: var(--black);
		color: var(--dark-grey);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 2rem 1rem;
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-sm);
		border-top: 1px solid var(--black);
		margin: -1px 0px 0px 0px;
	}

	footer a {
		color: var(--dark-grey);
		text-decoration: none;
		transition: color 0.4s ease-out;
	}

	footer nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	footer a:hover {
		color: var(--red);
		transition: color 0.4s ease-out;
	}

	@media screen and (min-width: 1024px) {
		footer nav {
			flex-direction: row;
			gap: 2rem;
			margin-bottom: 0;
		}

		footer {
			flex-direction: row;
			align-items: center;
			padding: 1.5rem 2rem;
			font-size: var(--font-size-desk-sm);
		}
	}

	@media screen and (min-width: 1680px) {
		footer {
			font-size: var(--font-size-giant-sm);
		}
	}
	
</style>
