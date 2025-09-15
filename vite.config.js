import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5003',
<<<<<<< HEAD
=======
=======
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
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