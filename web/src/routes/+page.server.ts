import sanity from '$lib/sanity';
import {
	splashscreen as splashscreenQuery,
	projectsHomepageQuery,
	settingsQuery
} from '$lib/queries';

export const load = async () => {
	const splashscreen = await sanity.fetch(splashscreenQuery);
	const projects = await sanity.fetch(projectsHomepageQuery);
	const settings = await sanity.fetch(settingsQuery);

	return {
		splashscreen,
		projects,
		settings
	};
};
