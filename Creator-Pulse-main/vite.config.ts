import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: [
      // Strip explicit version suffixes like "@radix-ui/react-slot@1.1.2" -> "@radix-ui/react-slot"
      { find: /^(.*)@\d+\.\d+\.\d+$/, replacement: '$1' },
    ],
  },
})


