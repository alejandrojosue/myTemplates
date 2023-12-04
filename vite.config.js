import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  base: 'https://alejandrojosue.github.io/myTemplates',
  server: {
    port: 3001,
    open: true,
  }
})
