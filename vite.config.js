// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure assets are served from the root
  publicDir: 'public', // Specify the public directory
  resolve: {
    alias: {
      // Set up path aliases for easier imports
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Enable CORS for development
    cors: true,
    // Handle SPA fallback for client-side routing
    historyApiFallback: true,
    // Force Vite to use WebSocket for HMR
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild's support for BigInt
      target: 'es2020',
      // This is needed for Three.js
      define: {
        global: 'globalThis',
      },
    },
    // Add these dependencies to the optimization process
    include: [
      'three',
      'three/examples/jsm/controls/OrbitControls',
      'three/examples/jsm/loaders/GLTFLoader',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  build: {
    outDir: 'dist',
    // Ensure large assets are properly handled
    assetsInlineLimit: 0,
    // Enable better error messages
    minify: 'esbuild',
    sourcemap: true,
    // Configure the base path for production
    emptyOutDir: true,
  },
});

