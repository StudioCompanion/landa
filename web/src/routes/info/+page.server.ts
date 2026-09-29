import { settingsQuery, aboutQuery } from '$lib/queries';
import { getServerSanityClient } from '$lib/sanity.server';

export const load = async ({ locals }) => {
	const sanity = getServerSanityClient(locals.preview);
	const about = await sanity.fetch(aboutQuery);
	const settings = await sanity.fetch(settingsQuery);

	return {
		about,
		settings,
		preview: locals.preview.enabled
	};
};
