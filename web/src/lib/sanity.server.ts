import { env } from '$env/dynamic/private';
import { createClient, type ClientPerspective } from '@sanity/client';
import {
	sanityApiVersion,
	sanityDataset,
	sanityProjectId,
	sanityStudioUrl
} from '$lib/sanity-config';

export type PreviewState = {
	enabled: boolean;
	perspective: ClientPerspective;
};

export function getServerSanityClient(preview: PreviewState) {
	const token = env.SANITY_API_READ_TOKEN;

	if (preview.enabled && !token) {
		console.warn(
			'[sanity] Preview requested but SANITY_API_READ_TOKEN is missing — serving published content'
		);
	}

	const usePreview = preview.enabled && Boolean(token);

	// Prefer API "drafts" perspective; fall back for older clients/tokens.
	const perspective: ClientPerspective = usePreview
		? preview.perspective || 'drafts'
		: 'published';

	return createClient({
		projectId: sanityProjectId,
		dataset: sanityDataset,
		apiVersion: sanityApiVersion,
		useCdn: false,
		token: usePreview ? token : undefined,
		perspective,
		stega: usePreview
			? {
					enabled: true,
					studioUrl: sanityStudioUrl
				}
			: undefined
	});
}
