import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server forwards API and socket traffic to the Express backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/socket.io': { target: 'http://localhost:5000', ws: true },
    },
  },
});
