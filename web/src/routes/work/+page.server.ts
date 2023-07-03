import { projectsQuery, settingsQuery } from '$lib/queries';
import sanity from '$lib/sanity';

export const load = async () => {
	const projects = await sanity.fetch(projectsQuery);
	const settings = await sanity.fetch(settingsQuery);

	return {
		projects,
		settings
	};
};

export const config = {
	isr: {
		expiration: 0,
		group: 1
	}
}