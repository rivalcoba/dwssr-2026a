import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Directorio raíz de los archivos fuente
  root: 'src',

  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: true,
  },

  // Configuración de build
  build: {
    // Directorio de salida relativo a la raíz del proyecto
    outDir: '../dist',
    emptyOutDir: true,
    // Generar manifest para integración con el servidor
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
    },
  },

  // Configuración para desarrollo
  publicDir: false,
});
