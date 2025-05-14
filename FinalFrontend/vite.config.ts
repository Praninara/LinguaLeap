import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.ts or vite.config.js

export default defineConfig({
  base: '/LinguaLeap/', // <--- Must start and end with /
  plugins: [react()],
})