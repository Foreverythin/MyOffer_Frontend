import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})


