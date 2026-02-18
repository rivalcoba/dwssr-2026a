import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper para Handlebars que genera las etiquetas de Vite
 * En desarrollo: conecta al servidor de Vite
 * En producción: usa los archivos compilados del manifest
 */
export function viteAssets() {
  const isDev = process.env.NODE_ENV !== 'production';
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

  if (isDev) {
    // En desarrollo, cargamos directamente desde Vite dev server
    // Como root es 'src', main.js está en la raíz del servidor Vite
    return `
    <script type="module" src="${viteDevServer}/@vite/client"></script>
    <script type="module" src="${viteDevServer}/main.js"></script>
    `;
  }

  // En producción, leemos el manifest y generamos las etiquetas
  const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    console.warn('Vite manifest not found. Run "npm run build" first.');
    return '';
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const mainEntry = manifest['main.js'];

  if (!mainEntry) {
    console.warn('Main entry not found in Vite manifest.');
    return '';
  }

  let tags = '';

  // CSS files
  if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
      tags += `<link rel="stylesheet" href="/${cssFile}">\n    `;
    });
  }

  // JS file
  tags += `<script type="module" src="/${mainEntry.file}"></script>`;

  return tags;
}

/**
 * Registra el helper de Vite en Handlebars
 */
export function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', function () {
    return new hbs.SafeString(viteAssets());
  });
}
