import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://134.209.246.21:9000',
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
})

