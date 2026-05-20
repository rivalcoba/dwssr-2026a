import path from 'node:path';
import { fileURLToPath } from "node:url"
// Importando el motor de plantillas
import { create as createHbsEngine } from 'express-handlebars'

// Importando al configuracion de Vite
import { registerViteHelper } from "./vite.js"

// Crando constantes de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Exportar la funcion de configuracion
export function configureHandlebars(app){
  // Configurando handlebars
  // Creo una instancia del View Engine
  const exphbs = createHbsEngine({
    extname: '.hbs',
    defaultLayout: 'main'
  })
  // Registrando Helper de Vite
  registerViteHelper(exphbs.handlebars)

  // Integrando Hbs al server
  // 1. Registro el motor
  app.engine('hbs', exphbs.engine)
  // 2. Establezco extensión para las vistas
  app.set('view engine', 'hbs')
  // 3. Establezco directorio de vistas
  app.set('views', path.join(__dirname,'..','views'))
}