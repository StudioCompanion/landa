import sanity from '$lib/sanity';
import {
	splashscreen as splashscreenQuery,
	projectsHomepageQuery,
	settingsQuery,
	homepageQuery
} from '$lib/queries';

export const load = async () => {
	const splashscreen = await sanity.fetch(splashscreenQuery);
	const projects = await sanity.fetch(projectsHomepageQuery);
	const settings = await sanity.fetch(settingsQuery);
	const homepage = await sanity.fetch(homepageQuery)
	return {
		splashscreen,
		projects,
		settings,
		homepage
	};
};

export const config = {
	isr: {
		expiration: 0,
		group: 1
	}
}