import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, 'src') },
    },
    server: {
      port: 3000,
      // Proxy /api sang backend Spring Boot để tránh CORS khi dev
      proxy: {
        '/api': {
          target: env.VITE_APP_BACKEND_URL || 'http://localhost:8081',
          changeOrigin: true,
        },
      },
    },
    preview: { port: 3000 },
    test: {
      environment: 'jsdom',
      setupFiles: './src/testing/setup-tests.js',
      css: false,
    },
  };
});
