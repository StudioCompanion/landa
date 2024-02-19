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
	<a class="text-link" class:active={$page.route.id === '/work'} href="/work">Work</a>
	<a class="logo" href="/">
		<svg
			class={isInfoPage ? 'no-hover-color' : ''}
			width="173"
			height="24"
			viewBox="0 0 173 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M69.1332 0.600103C66.2665 1.96677 65.2998 5.43344 66.8998 8.5001L67.5998 9.83344L66.0332 11.5334C60.0332 18.0668 66.2998 26.9001 74.1665 23.0001C75.3332 22.4001 75.5332 22.4001 75.8665 22.8334C76.1332 23.2001 76.9332 23.3334 78.9665 23.3334H81.6665L80.1665 21.0001C79.3332 19.7001 78.6665 18.5668 78.6665 18.4334C78.6665 18.3334 79.0332 17.3001 79.4665 16.2001C79.8998 15.0668 80.3665 13.5334 80.4998 12.7334L80.7332 11.3334H78.6998H76.6998L76.4665 12.5001C76.3665 13.1334 76.1332 13.7334 75.9998 13.8334C75.8332 13.9334 75.2665 13.2668 74.7332 12.3668L73.7332 10.7334L74.9665 9.73344C78.1665 7.16677 78.0998 2.26677 74.8332 0.700102C73.2332 -0.0665646 70.6998 -0.0998974 69.1332 0.600103ZM72.3665 3.66677C73.1998 4.13344 73.1665 5.36677 72.2665 6.5001L71.5332 7.43344L70.9332 6.66677C70.1665 5.73344 70.1665 4.13344 70.9332 3.7001C71.6332 3.26677 71.5998 3.26677 72.3665 3.66677ZM71.5332 16.0334C72.3665 17.3334 72.9665 18.6001 72.8665 18.8668C72.6332 19.4334 71.2332 19.8001 70.1665 19.5334C69.2665 19.3001 68.3332 17.8001 68.3332 16.6001C68.3332 15.8668 69.4665 13.6668 69.8332 13.6668C69.9332 13.6668 70.6998 14.7334 71.5332 16.0334Z"
				fill="currentColor"
			/>
			<path
				d="M106.1 0.36659C104.367 0.86659 102.8 2.69992 102.367 4.69992C101.667 7.99992 102.667 10.4333 105.567 12.4999C109.433 15.2666 110.133 15.8666 110.4 16.7333C110.833 18.0333 110.1 19.4666 108.9 19.5999C107.567 19.7666 107.033 19.1666 106.8 17.2999L106.567 15.6333L104.2 15.7333L101.833 15.8333L101.867 16.9999C101.933 20.1666 102.967 22.0999 105.133 23.2333C106.433 23.9333 110.767 23.9999 112 23.3666C114.933 21.7999 116.3 18.1666 115.333 14.5999C114.833 12.7999 113.567 11.4999 110.433 9.46659C107.333 7.46659 106.6 6.43326 107.4 4.99992C107.9 4.06659 109.133 3.73326 109.867 4.36659C110.133 4.56659 110.433 5.33326 110.533 6.03326L110.767 7.33326H113.033H115.333V5.93326C115.333 5.16659 115.033 3.89992 114.633 3.13326C113.433 0.599924 109.6 -0.63341 106.1 0.36659Z"
				fill="currentColor"
			/>
			<path
				d="M121.5 0.433603C118.867 1.46694 117.667 3.36694 117.667 6.36694C117.667 9.70027 118.467 10.9336 122.567 13.7003C125.133 15.4336 126 16.4003 126 17.5003C126 18.6669 125.067 19.6669 124 19.6669C122.9 19.6669 122.533 19.1336 122.167 17.0669L121.933 15.6669H119.633H117.333V17.4003C117.333 19.5003 118.233 21.6003 119.467 22.6003C119.967 22.9669 121.2 23.4669 122.2 23.6669C127.433 24.7669 131.067 21.8669 130.967 16.6669C130.933 13.5669 130 12.2336 126.1 9.66694C124.667 8.70027 123.3 7.66694 123.1 7.40027C122.567 6.7336 122.533 4.9336 123.067 4.40027C124.167 3.30027 126 4.5336 126 6.40027C126 7.3336 126 7.3336 128.3 7.3336C130.9 7.3336 131.067 7.16694 130.7 5.10027C130.1 1.90027 128.067 0.266935 124.5 0.100269C123.4 0.0669365 122.033 0.20027 121.5 0.433603Z"
				fill="currentColor"
			/>
			<path
				d="M137.2 0.50013C135.467 1.10013 134.133 2.46679 133.433 4.30013C132.933 5.5668 132.833 6.90013 132.833 12.0001C132.833 19.9335 133.333 21.4335 136.433 23.0668C138.4 24.1001 142.267 24.1001 144.233 23.0668C147.333 21.4335 147.833 19.9335 147.833 12.0001C147.833 5.1668 147.5 3.60013 145.733 1.90013C143.9 0.133463 140 -0.49987 137.2 0.50013ZM141.867 5.03346C142.433 5.6668 142.5 6.30013 142.5 11.8001C142.5 18.2668 142.3 19.1668 140.867 19.5335C139.767 19.8001 138.733 19.1668 138.433 18.0668C138.267 17.5668 138.167 14.6001 138.167 11.4668C138.167 6.30013 138.233 5.6668 138.8 5.03346C139.6 4.13346 141.067 4.13346 141.867 5.03346Z"
				fill="currentColor"
			/>
			<path
				d="M155 0.300497C153.133 0.867165 151.967 1.73383 151.1 3.26716C150.2 4.8005 150.167 4.96716 150.067 10.7005C149.9 18.2338 150.233 19.9672 152.133 21.8672C155.4 25.1672 162.1 24.4005 163.967 20.5338C164.367 19.7338 164.767 18.1005 164.9 16.8672L165.1 14.6672H162.433H159.733L159.6 16.7005C159.5 18.2005 159.267 18.8672 158.833 19.2005C157.933 19.8672 156.867 19.7672 156.133 18.9672C155.567 18.3338 155.5 17.6005 155.4 12.7338C155.267 6.7005 155.567 4.86716 156.7 4.5005C158.433 3.93383 159.667 5.2005 159.667 7.53383V8.7005L162.267 8.6005L164.833 8.5005L164.733 6.7005C164.5 2.53383 161.667 -0.0328369 157.333 0.0338306C156.5 0.0338306 155.467 0.167164 155 0.300497Z"
				fill="currentColor"
			/>
			<path
				d="M0 11.9997V23.333H5.83333H11.6667V20.9997V18.6663H8.5H5.33333V9.66634V0.66634H2.66667H0V11.9997Z"
				fill="currentColor"
			/>
			<path
				d="M15.7335 11.5663C14.4002 17.5997 13.3335 22.6997 13.3335 22.8997C13.3335 23.1997 14.0668 23.333 15.9668 23.333H18.5668L18.8668 21.233L19.1668 19.1663L21.2335 19.0663C23.5335 18.9663 23.4335 18.8663 23.8335 21.733L24.0335 23.333H26.7335C29.1335 23.333 29.4002 23.2663 29.2668 22.733C29.1668 22.433 28.0668 17.333 26.8002 11.433L24.5002 0.66634H21.3002H18.1335L15.7335 11.5663ZM22.1335 10.333C22.4335 12.433 22.6668 14.3663 22.6668 14.5663C22.6668 14.8663 22.1335 14.9997 21.1335 14.9997C20.0335 14.9997 19.6335 14.8663 19.7668 14.5663C19.8335 14.3663 20.2002 12.2663 20.5335 9.89967C20.8668 7.56634 21.2335 5.83301 21.3668 6.06634C21.4668 6.29967 21.8335 8.23301 22.1335 10.333Z"
				fill="currentColor"
			/>
			<path
				d="M31 12.0005V23.3339H33.3333H35.6667L35.7333 17.1672L35.8333 10.9672L37.6667 17.0672L39.5 23.1672L42.4333 23.2672L45.3333 23.3672V12.0005V0.667187H42.8333H40.3333L40.3 6.56719V12.5005L38.4333 6.56719L36.5333 0.667187H33.7667H31V12.0005Z"
				fill="currentColor"
			/>
			<path
				d="M47.3335 11.9997V23.333H53.6668H60.0335L59.9335 21.0663L59.8335 18.833L56.2335 18.733L52.6335 18.633L52.7335 16.233L52.8335 13.833L56.1002 13.733L59.3335 13.633V11.4997V9.36634L56.1002 9.26634L52.8335 9.16634L52.7335 7.06634L52.6335 4.99967H56.3335H60.0002V2.83301V0.66634H53.6668H47.3335V11.9997Z"
				fill="currentColor"
			/>
			<path
				d="M87.4 11.7663C86.0667 17.8663 85 22.9663 85 23.0997C85 23.233 86.1667 23.333 87.6333 23.333H90.2667L90.4667 21.7663C90.8667 18.9663 90.8333 18.9997 93 18.9997C95.1667 18.9997 95.1333 18.9663 95.5333 21.733L95.7333 23.333H98.3667C99.8333 23.333 101 23.233 101 23.0997C101 22.9663 99.9333 17.8663 98.6 11.7663L96.2 0.66634H93H89.8L87.4 11.7663ZM93.7667 9.89967C94.5333 15.3663 94.6 15.0663 92.9333 14.933C92.1333 14.8663 91.5333 14.6663 91.5667 14.4663C91.6 14.2997 91.8667 12.2997 92.2 10.0663C92.5 7.83301 92.8667 5.99967 93 5.99967C93.1333 5.99967 93.4667 7.76634 93.7667 9.89967Z"
				fill="currentColor"
			/>
			<path
				d="M168.034 19.5334C166.834 21.0334 167.167 22.7 168.734 23.5334C171.367 24.9 173.8 21.8667 171.967 19.5334C171.434 18.8667 171 18.6667 170 18.6667C169 18.6667 168.567 18.8667 168.034 19.5334Z"
				fill="currentColor"
			/>
		</svg>
	</a>

	<a class="text-link" class:infoActive={isInfoPage} href="/info">Info</a>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 12px 20px;
		z-index: 50;
		font-family: var(--font-serif);
		font-size: var(--font-size-mob-sm);
		background: white;
		border-bottom: 1px solid var(--light-grey);
		transition: all 0.1s ease-out;
	}

	/* Logo Colour */
	header svg {
		color: var(--logo-color);
		max-width: 100%;
	}

	.logo {
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 200px;
		height: 18px;
		overflow: hidden;
		transform: translateY(0.13rem);
		transition: transform 0.1s ease-in-out;
	}

	.logo svg {
		width: 100%;
		height: 100%;
	}

	.logo:hover svg {
		color: var(--black);
		transition: color 0.2s ease-in-out;
	}

	.logo svg {
		transition: color 0.2s ease-in-out;
	}

	.logo:hover svg:not(.no-hover-color) {
		color: var(--red);
		transition: color 0.2s ease-in-out;
	}

	/* Default Link Styles */
	header a {
		text-decoration: none;
		color: var(--logo-color);
		height: 24px;
		transition: color 0.4s ease-out;
	}

	a.active {
		color: var(--red);
		transition: color 0.4s ease-out;
	}

	a:hover {
		color: var(--red);
		transition: color 0.4s ease-out;
	}

	/* Adjust the Info link when active */
	a.infoActive {
		color: white;  /* White when active */
		transition: color 0.4s ease-out;
	}

    /* Adjust the Info link on hover when active */
	a.infoActive:hover {
		color: black;  /* White on rollover */
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
		background: none;
		/* border-bottom: 1px solid transparent; */
	}

	.infoScrolled {
		background: red;
		border-bottom: 1px solid var(--light-grey);
	}


	@media screen and (min-width: 1024px) {
		header {
			padding: 20px 32px;
			font-size: var(--font-size-desk-sm);
		}

		.logo {
			width: 200px;
			height: 28px;
			transform: translateY(-0.12rem);
		}

		.scrolled .logo {
			/* transform: translateY(1.5rem); */
		}

		.text-link {
			line-height: 155%;
		}
	}

	@media screen and (min-width: 1680px) {
		header {
			font-size: var(--font-size-giant-sm);
		}
		.text-link {
			line-height: 120%;
		}

		.logo {
			width: 280px;
			height: 32px;
			transform: translateY(-0.3rem);
		}

		.scrolled .logo {
			/* transform: translateY(1.2rem); */
		}
	}
</style>
