import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.V === 'true'
    ? '/'
    : (process.env.NODE_ENV === 'production' ? '/weatherDashboard/' : '/'),
  define: {
    global: 'globalThis',
  },
})