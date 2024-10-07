import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: true,
	},
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
	  },
	  ssr: {
		noExternal: ['svelte-carousel']
	  },
	  server: {
		host: '0.0.0.0', // Changed from true to '0.0.0.0'
		port: 5173
	  }
});
