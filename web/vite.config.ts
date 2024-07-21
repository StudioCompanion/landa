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
		host: '192.168.1.8',
		port: 5173
	  }
});
