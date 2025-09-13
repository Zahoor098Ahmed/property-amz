import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ['react-icons/fa', 'react-icons'],
  },
  build: {
    target: 'esnext',
    cssTarget: 'chrome80',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  esbuild: {
    target: 'es2020',
  },
})