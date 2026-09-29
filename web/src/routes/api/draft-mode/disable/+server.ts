import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const redirectTo = url.searchParams.get('redirect') || '/';
	const expired = [
		`${perspectiveCookieName}=`,
		'Path=/',
		'HttpOnly',
		'Secure',
		'SameSite=None',
		'Max-Age=0'
	];

	const headers = new Headers();
	headers.append('Set-Cookie', expired.join('; '));
	headers.append('Set-Cookie', [...expired, 'Partitioned'].join('; '));
	headers.set('Location', redirectTo);

	return new Response(null, { status: 307, headers });
};
