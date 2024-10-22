import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Вказуємо порт 3000
    proxy: {
      '/api': {
        target: 'http://134.209.246.21:9000',
        changeOrigin: true,
      },
    },
  },
})

