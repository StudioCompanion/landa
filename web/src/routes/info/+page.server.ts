import sanity from '$lib/sanity';
import {
    settingsQuery,
    aboutQuery
} from '$lib/queries';

export const load = async () => {
    const about = await sanity.fetch(aboutQuery)
    const settings = await sanity.fetch(settingsQuery);

    return {
        about,
        settings
    };
};
