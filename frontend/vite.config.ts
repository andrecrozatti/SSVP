import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ssvp',
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar warnings de dependências, por exemplo
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return;
        }
        warn(warning);
      }
    }
  }
})
