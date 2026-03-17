import createError from "http-errors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import indexRouter from "#routes/index.js";
import usersRouter from "#routes/users.js";
// Importando el configurador de Handlebars para Express
import { configureHandlebars } from "./lib/handlebars.js";
// Importando la configuracion de Winston para el logger
import logger from "./lib/winston.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
logger.info("Iniciando configuración de la aplicación");

// view engine setup
configureHandlebars(app);

// Morgan redirige sus logs a Winston como nivel informativo
// Morgan --->[logs]---> Winston ---> [Logs a transportes informativos]
app.use(morgan("dev", { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos: en producción servimos desde dist (assets compilados por Vite)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "dist")));
}
// También servimos public para otros assets estáticos (imágenes, etc.)
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  logger.error(`Error ${err.status || 500}: ${err.message}`);
  // Pasamos un objeto plano para evitar warnings de acceso a prototipos en Handlebars.
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development"
      ? {
          status: err.status || 500,
          stack: err.stack,
        }
      : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
