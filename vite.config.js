import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    // Drop console.log and debugger statements in production
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-vendor': ['react', 'react-dom'],
          // Routing
          'router': ['react-router-dom'],
          // Animation libraries (heaviest)
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap', '@gsap/react'],
          // 3D library
          'three': ['three'],
          // Icon libraries
          'icons': ['lucide-react', 'react-icons'],
        },
      },
    },
    // Increase chunk size warning limit slightly
    chunkSizeWarningLimit: 600,
  },
})
