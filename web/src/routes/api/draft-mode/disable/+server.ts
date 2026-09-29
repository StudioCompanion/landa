import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const redirectTo = url.searchParams.get('redirect') || '/';

	cookies.delete(perspectiveCookieName, {
		path: '/'
	});

	// Also clear partitioned variant used for Studio iframe previews.
	const headers = new Headers();
	headers.append(
		'Set-Cookie',
		[
			`${perspectiveCookieName}=`,
			'Path=/',
			'HttpOnly',
			'Secure',
			'SameSite=None',
			'Max-Age=0',
			'Partitioned'
		].join('; ')
	);
	headers.set('Location', redirectTo);
	return new Response(null, { status: 307, headers });
};
