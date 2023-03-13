import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vitest.setup.js',
  },
})
