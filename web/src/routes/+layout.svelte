<script>
	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import 'modern-normalize/modern-normalize.css';
	import '../styles/index.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	export let data;

	$: pathname = data.pathname;

	/** @type {null | ((update: {type: string, url: string}) => void)} */
	let visualEditingNavigate = null;

	// Must run during component init — not later inside Sanity's subscribe.
	afterNavigate(({ to }) => {
		visualEditingNavigate?.({
			type: 'push',
			url: to?.url?.href || (typeof window !== 'undefined' ? window.location.href : '/')
		});
	});

	onMount(() => {
		const inStudioIframe = (() => {
			try {
				return window.self !== window.top;
			} catch {
				return true;
			}
		})();

		// Presentation needs the Comlink handshake even if the draft cookie
		// hasn't landed yet; only skip for normal public browsing.
		if (!data.preview && !inStudioIframe) return;

		let disableVisualEditing = () => {};
		let cancelled = false;

		(async () => {
			const { enableVisualEditing } = await import('@sanity/visual-editing-standalone');
			if (cancelled) return;

			disableVisualEditing = enableVisualEditing({
				history: {
					subscribe(navigate) {
						visualEditingNavigate = navigate;
						const onPopState = () => {
							navigate({ type: 'pop', url: window.location.href });
						};
						window.addEventListener('popstate', onPopState);
						return () => {
							window.removeEventListener('popstate', onPopState);
							if (visualEditingNavigate === navigate) {
								visualEditingNavigate = null;
							}
						};
					},
					update(update) {
						if (update.type === 'push') {
							goto(update.url);
						} else if (update.type === 'replace') {
							goto(update.url, { replaceState: true });
						} else if (update.type === 'pop') {
							history.back();
						}
					}
				},
				refresh() {
					window.location.reload();
					return new Promise(() => {});
				}
			});
		})();

		return () => {
			cancelled = true;
			disableVisualEditing();
			visualEditingNavigate = null;
		};
	});
</script>

{#key pathname}

{#if data.preview}
	<div class="preview-banner">
		Preview mode — drafts are visible.
		<a href="/api/draft-mode/disable">Exit preview</a>
	</div>
{/if}

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
	.preview-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10000;
		background: #111;
		color: #fff;
		font-size: 12px;
		line-height: 1.2;
		padding: 8px 12px;
		text-align: center;
	}

	.preview-banner a {
		color: #fff;
		text-decoration: underline;
		margin-left: 8px;
	}

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
		display: none;
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
		display: none;
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
