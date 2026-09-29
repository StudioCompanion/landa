import { projectQuery, settingsQuery } from '$lib/queries.js';
import { getServerSanityClient } from '$lib/sanity.server';

export const load = async ({ params, locals, setHeaders }) => {
	const slug = params.slug as string;
	const sanity = getServerSanityClient(locals.preview);

	if (locals.preview.enabled) {
		setHeaders({ 'Cache-Control': 'no-store' });
	}

	const project = await sanity.fetch(projectQuery, { slug });
	const settings = await sanity.fetch(settingsQuery);
	return {
		project,
		settings,
		slug,
		preview: locals.preview.enabled
	};
};
