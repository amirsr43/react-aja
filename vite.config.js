import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) manualChunks function
        manualChunks(id) {
          // Normalize backslashes to forward slashes for Windows compatibility
          const normalizedId = id.replace(/\\/g, '/');
          
          if (normalizedId.includes('node_modules/three')) {
            return 'three';
          }
          if (normalizedId.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (normalizedId.includes('node_modules/react-router-dom') || normalizedId.includes('node_modules/react-router')) {
            return 'router';
          }
          if (normalizedId.includes('node_modules/lucide-react') || normalizedId.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (normalizedId.includes('node_modules/react-dom')) {
            return 'react-dom';
          }
          if (normalizedId.includes('node_modules/react/')) {
            return 'react';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
