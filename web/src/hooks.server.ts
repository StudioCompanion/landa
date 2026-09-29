import type { Handle } from '@sveltejs/kit';
import type { ClientPerspective } from '@sanity/client';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';

function parsePerspective(value: string | undefined): ClientPerspective {
	if (!value) return 'drafts';
	try {
		const decoded = decodeURIComponent(value);
		// Stacked perspectives arrive as comma-separated values.
		if (decoded.includes(',')) {
			return decoded.split(',') as ClientPerspective;
		}
		return decoded as ClientPerspective;
	} catch {
		return 'drafts';
	}
}

export const handle: Handle = async ({ event, resolve }) => {
	const perspectiveCookie = event.cookies.get(perspectiveCookieName);
	const previewEnabled = Boolean(perspectiveCookie);

	event.locals.preview = {
		enabled: previewEnabled,
		perspective: parsePerspective(perspectiveCookie)
	};

	const response = await resolve(event);

	if (previewEnabled) {
		response.headers.set('Cache-Control', 'no-store');
	}

	return response;
};
