export const load = async ({ url }: { url: { pathname: string } }) => {
	const { pathname } = url;

	return {
		pathname
	};
};
