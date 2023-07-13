<script>
	let date = new Date().getFullYear();
</script>

<footer>
	<nav>
		<a href="/work">Work</a>
		<a href="/info">Info</a>
		<a href="mailto:studio@laneandassociates.co">Contact</a>
		<a href="https://www.instagram.com/lane_and_associates/" target="_blank" rel="noreferrer"
			>Instagram</a
		>
	</nav>
	<div>
		&copy; Lane & Associates &dot; {date}
	</div>
</footer>

<style>
	footer {
		background-color: #f2f2f2;
		color: #919191;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 1rem;
	}

	footer a {
		color: #919191;
		text-decoration: none;
	}

	footer nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	@media screen and (min-width: 768px) {
		footer nav {
			flex-direction: row;
			gap: 2rem;
			margin-bottom: 0;
		}

		footer {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
