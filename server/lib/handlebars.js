import path from "node:path";
import { fileURLToPath } from "node:url";
import { create as createHbsEngine } from "express-handlebars";

import { registerViteHelper } from "./vite.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportamos la función para configurar Handlebars en Express
export function configureHandlebars(app) {
  // Configuración de Handlebars con extensión .hbs y 
  // layout por defecto "main"
  const exphbs = createHbsEngine({
    extname: ".hbs",
    defaultLayout: "main",
  });

  // Registramos el helper personalizado "vite" 
  // para generar URLs de assets con Vite
  registerViteHelper(exphbs.handlebars);

  // Configuramos Express para usar Handlebars como motor de vistas
  app.engine("hbs", exphbs.engine);
  // Establecemos la extensión de archivos de vistas a .hbs
  app.set("view engine", "hbs");
  // Establecemos el directorio de vistas (templates) 
  // a "views" en la raíz del proyecto
  app.set("views", path.join(__dirname, "..", "views"));
}