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
	<div class="column-one">
		<div><p>&copy; Lane & Associates {date}</p></div>
		<div>
			<ul>
				<li><a href="mailto:studio@laneandassociates.co">General enquiries: studio@laneandassociates.co</a></li>
				<li><a href="mailto:agent@minititle.com">Commercial agent: Minititle</a></li>
				<li><a href="https://www.wylieagency.com/">Literary agent: The Wylie Agency</a></li>
				<li><a href="https://www.instagram.com/laneandassociates/">Instagram: @laneandassociates</a></li>
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
			<p>L&A Paris</p>
			<p>300 Elizabeth St, Garden Level</p>
			<p>Paris 000000</p>
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


	/* footer {
		background-color: var(--white);
		color: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 2rem 1rem;
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-sm);
		border-top: 1px solid var(--black);
		margin: -1px 0px 0px 0px;
	} */




	/*  */
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
	
</style>
