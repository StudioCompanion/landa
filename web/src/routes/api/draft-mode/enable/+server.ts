import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import {
	sanityApiVersion,
	sanityDataset,
	sanityProjectId
} from '$lib/sanity-config';
import type { RequestHandler } from './$types';

const SECRET_PARAMS = [
	'sanity-preview-secret',
	'sanity-preview-pathname',
	'sanity-preview-perspective',
	'sanity-preview-variant'
];

function cleanRedirectPath(redirectTo: string | undefined, origin: string) {
	const target = new URL(redirectTo || '/', origin);
	for (const param of SECRET_PARAMS) {
		target.searchParams.delete(param);
	}
	return `${target.pathname}${target.search}`;
}

export const GET: RequestHandler = async ({ url, request, cookies }) => {
	const token = env.SANITY_API_READ_TOKEN;
	if (!token) {
		return new Response('Missing SANITY_API_READ_TOKEN', { status: 500 });
	}

	const client = createClient({
		projectId: sanityProjectId,
		dataset: sanityDataset,
		apiVersion: sanityApiVersion,
		useCdn: false,
		token
	});

	const { isValid, redirectTo, studioPreviewPerspective } = await validatePreviewUrl(
		client,
		url.href
	);

	if (!isValid) {
		return new Response('Invalid or expired preview secret', { status: 401 });
	}

	const cleanRedirect = cleanRedirectPath(redirectTo, url.origin);
	const perspective = studioPreviewPerspective || 'drafts';
	const partitioned =
		request.headers.get('sec-fetch-dest') === 'iframe' &&
		request.headers.get('sec-fetch-site') === 'cross-site';

	if (partitioned) {
		const headers = new Headers();
		headers.append(
			'Set-Cookie',
			[
				`${perspectiveCookieName}=${encodeURIComponent(perspective)}`,
				'Path=/',
				'HttpOnly',
				'Secure',
				'SameSite=None',
				'Max-Age=3600',
				'Partitioned'
			].join('; ')
		);
		headers.set('Location', cleanRedirect);
		return new Response(null, { status: 307, headers });
	}

	cookies.set(perspectiveCookieName, encodeURIComponent(perspective), {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		maxAge: 3600
	});

	throw redirect(307, cleanRedirect);
};
