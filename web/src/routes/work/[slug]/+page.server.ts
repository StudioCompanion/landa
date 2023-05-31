import { projectQuery, settingsQuery } from '$lib/queries.js';
import sanity from '$lib/sanity.js';

export const load = async ({ params }) => {
	const slug = params.slug as string;

	const project = await sanity.fetch(projectQuery, { slug });
	const settings = await sanity.fetch(settingsQuery);
	return {
		project,
		settings,
		slug
	};
};
