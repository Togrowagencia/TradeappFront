import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /*
  optimizeDeps: {
    exclude: ['@google-translate-select/react'],
  },
  resolve: {
    alias: {
      // Usa la versión UMD en lugar de la versión ESM
      '@google-translate-select/react': path.resolve(
        __dirname,
        'node_modules/@google-translate-select/react/dist/umd/index.umd.js'
      ),
    },
  },*/
  build: {
    assetsInlineLimit: 30000, 
    chunkSizeWarningLimit: 4000, 
  }
})