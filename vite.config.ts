import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        parabolas: './parabolas.html',
        ellipses: './ellipses.html', 
        circles: './circles.html',
        hyperbolas: './hyperbolas.html',
        'spare-parts': './spare-parts.html',
        gallery: './gallery.html',
        angels: './angels.html'
      }
    }
  },
  server: {
    port: 8000,
    open: true
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    }
  }
})
