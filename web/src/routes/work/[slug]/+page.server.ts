import { projectQuery, settingsQuery } from '$lib/queries.js';
import { getServerSanityClient } from '$lib/sanity.server';

export const load = async ({ params, locals }) => {
	const slug = params.slug as string;
	const sanity = getServerSanityClient(locals.preview);

	const project = await sanity.fetch(projectQuery, { slug });
	const settings = await sanity.fetch(settingsQuery);
	return {
		project,
		settings,
		slug,
		preview: locals.preview.enabled
	};
};

export const config = {
	isr: {
		expiration: 0,
		group: 1
	}
};
