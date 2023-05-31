/**
 * This action triggers a custom event on node entering/exiting the viewport.
 * example:
 * <p
 * 	use:inView
 * 	on:enter={() => console.log("enter")}
 * 	on:exit={() => console.log("exit")}
 * >
 */

export default function inView(node: any, params = {}) {
	let observer: IntersectionObserver;

	const handleIntersect = (e: any) => {
		const v = e[0].isIntersecting ? 'enter' : 'exit';
		node.dispatchEvent(new CustomEvent(v));
	};

	const setObserver = ({ root, threshold }: any) => {
		const options = { root, threshold };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
	};

	setObserver(params);

	return {
		update(params: any) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}
