import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteStaticCopy({
    targets: [
      {
        src: 'sw.js',
        dest: ''
      },
      {
        src: 'js/app.js',
        dest: 'js'
      },
      {
        src: 'public',
        dest: ''
      },
      {
        src: 'js/sw-utils.js',
        dest: 'js'
      },
      {
        src: 'js/sw-bd.js',
        dest: 'js'
      },
      {
        src: 'public/icons',
        dest: 'icons'
      },
      {
        src: 'public/screenshots',
        dest: 'screenshots'
      },
      {
        src: '.htaccess',
        dest: ''
      }
    ],
  }), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias para que '@' apunte a la carpeta 'src'
    },
  },
});
