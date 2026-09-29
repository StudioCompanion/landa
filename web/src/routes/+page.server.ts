import {
	splashscreen as splashscreenQuery,
	projectsHomepageQuery,
	settingsQuery,
	homepageQuery
} from '$lib/queries';
import { getServerSanityClient } from '$lib/sanity.server';

export const load = async ({ locals }) => {
	const sanity = getServerSanityClient(locals.preview);
	const splashscreen = await sanity.fetch(splashscreenQuery);
	const projects = await sanity.fetch(projectsHomepageQuery);
	const settings = await sanity.fetch(settingsQuery);
	const homepage = await sanity.fetch(homepageQuery);
	return {
		splashscreen,
		projects,
		settings,
		homepage,
		preview: locals.preview.enabled
	};
};

export const config = {
	isr: {
		expiration: 0,
		group: 1
	}
};
