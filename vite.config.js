import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  base: './',
  envDir: './env',
  plugins: [react()],
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@mocks': path.resolve(__dirname, './src/__mocks__'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@molecules': path.resolve(__dirname, './src/components/molecules'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@templates': path.resolve(__dirname, './src/components/templates'),
      '@pages': path.resolve(__dirname, './src/pages'),
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
    setupFiles: 'config/vitest.setup.js',
  },
  eslintConfig: {
    ignorePatterns: ['config/.eslintignore'],
  },
})
