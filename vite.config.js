import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // The map's web worker ships as .mjs; emit it as .js so any web server (e.g. cPanel/Apache)
        // serves it with a JavaScript MIME type, which browsers require for module workers.
        assetFileNames: (asset) =>
          (asset.names?.[0] || asset.name || '').endsWith('.mjs') ? 'assets/[name]-[hash].js' : 'assets/[name]-[hash][extname]',
      },
    },
  },
})
