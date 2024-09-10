import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: false,
    minify: false,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    }
  },
  server: {
    open: true,
  }
});