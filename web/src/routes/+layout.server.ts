export const load = async ({ locals }) => {
	return {
		preview: locals.preview.enabled
	};
};
