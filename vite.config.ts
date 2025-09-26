import path from 'path';
/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
      },
      server: {
        port: 3000,
        host: 'localhost',
        proxy: {
          '/api': {
            target: 'http://localhost:4000',
            changeOrigin: true,
          },
        },
      },
      plugins: [react(), tailwindcss()],

      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
