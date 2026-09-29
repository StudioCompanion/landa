// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { ClientPerspective } from '@sanity/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			preview: {
				enabled: boolean;
				perspective: ClientPerspective;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
