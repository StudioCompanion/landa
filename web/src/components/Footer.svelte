<script>
	import { onMount } from 'svelte';
	let date = new Date().getFullYear();

	let footerOpacity = 1; // Initial opacity

	onMount(() => {
		setTimeout(() => {
		footerOpacity = 1; // Transition to full opacity
	}, 0); // Adjust timing as needed
	});
</script>

<footer>
	<div class="column-one">
		<div><p>&copy; Lane & Associates {date}</p></div>
		<div>
			<ul>
				<li>General enquiries: <a class="footer-link" href="mailto:studio@laneandassociates.co">studio@laneandassociates.co</a></li>
				<li>Commercial agent: <a class="footer-link" href="mailto:agent@minititle.com">Minititle</a></li>
				<li>Literary agent: <a class="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.wylieagency.com/">The Wylie Agency</a></li>
				<li>Instagram: <a class="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/lane_and_associates/">@lane_and_associates</a></li>
			</ul>
		</div>
	</div>
	<div class="column-two">
		<div>
			<p>
				L&A London
			</p>
			<p>
				Unit 15 Sarah Lane Studios
			</p>
			<p>
				60 Stanway Street
			</p>
			<p>
				London N1 123
			</p>
		</div>
		<div>
			<p>L&A New York</p>
			<p>300 Elizabeth St, Garden Level</p>
			<p> New York City NY 10012</p>
		</div>
	</div>
</footer>

<style>
	ul, li {
		list-style: none;
		margin-block-start: 0;
		margin-block-end: 0;
		padding-inline-start: 0;
	}
	footer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: var(--half-space);
		row-gap: var(--half-space);
		border-top: 1px solid var(--grey);
	}

	.column-one, .column-two {
		display: flex;
		flex-direction: column;
		width: auto;
		column-gap: var(--half-space);
		row-gap: var(--half-space);
	}

	.footer-link {
		font-family: var(--font-serif-italic);
		line-height: 101%;
	}

	/* Tablet layout: two columns with divs stacked vertically */
	@media (min-width: 769px) and (max-width: 1024px) { /* Adjust the breakpoints as needed for tablet */
		footer {
			flex-direction: row;
			justify-content: left;
			column-gap: var(--full-space);
		}
	}

	/* Desktop layout: two columns with divs next to each other horizontally */
	@media (min-width: 1025px) { /* Adjust the breakpoint as needed for desktop */
		footer {
			flex-direction: row;
		}
		.column-one, .column-two {
			flex-direction: row;
		}
	}

	footer a {
		color: var(--light-grey);
		text-decoration: none;
	}

	footer a:hover {
		color: var(--red);
	}
	
</style>
