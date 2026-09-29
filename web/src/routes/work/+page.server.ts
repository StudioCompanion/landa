import { projectsQuery, settingsQuery } from '$lib/queries';
import { getServerSanityClient } from '$lib/sanity.server';

export const load = async ({ locals }) => {
	const sanity = getServerSanityClient(locals.preview);
	const projects = await sanity.fetch(projectsQuery);
	const settings = await sanity.fetch(settingsQuery);

	return {
		projects,
		settings,
		preview: locals.preview.enabled
	};
};

export const config = {
	isr: {
		expiration: 0,
		group: 1
	}
};
