import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'vue-router/vite'
import tailwindcss from '@tailwindcss/vite'
import { FontaineTransform } from 'fontaine'

const options = {
  // You can specify fallbacks as an array (applies to all fonts)
  fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],

  // Or as an object to configure specific fallbacks per font family
  // fallbacks: {
  //   Poppins: ['Helvetica Neue'],
  //   'JetBrains Mono': ['Courier New']
  // },

  // You may need to resolve assets like `/fonts/Roboto.woff2` to a particular directory
  resolvePath: (id: string) => `file:///path/to/public/dir${id}`,
  fallbackName: (originalName: string) => `${originalName} fallback`,
  sourcemap: true,
  // skipFontFaceGeneration: (fallbackName) => fallbackName === 'Roboto fallback'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter({}), vue(), vueDevTools(), FontaineTransform.vite(options), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
