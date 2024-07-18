import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@fortawesome/fontawesome-free': '/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    },
  },
})