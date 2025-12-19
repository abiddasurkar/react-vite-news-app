import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-vite-news-app/',
  plugins: [react()],
})
