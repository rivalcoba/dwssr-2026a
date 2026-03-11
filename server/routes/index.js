import express from "express";
import logger from "../lib/winston.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, _next) {
  res.render("index", { title: "Express" });
});

// Ruta de prueba para verificar los diferentes niveles de log
// Acceder a: GET /test-logs
router.get("/test-logs", function (req, res) {
  logger.error("Esto es un mensaje de ERROR - algo falló");
  logger.warn("Esto es un mensaje de WARN - algo podría estar mal");
  logger.info("Esto es un mensaje de INFO - operación exitosa");
  logger.http("Esto es un mensaje de HTTP - petición recibida");
  logger.debug("Esto es un mensaje de DEBUG - detalle de depuración");

  res.json({
    message: "Logs de prueba generados. Revisa la consola y los archivos en /logs",
    archivos: [
      "logs/app-YYYY-MM-DD.log  → DailyRotateFile (info+warn+error en JSON)",
      "logs/app-readable.log    → Formato legible (info+warn+error)",
      "logs/error.log           → Solo errores",
    ],
  });
});

// Rutas de prueba para exceptions y rejections (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
  // Ruta para probar exceptionHandlers (excepción no capturada)
  // Acceder a: GET /test-exception
  // ADVERTENCIA: Esto lanza un error fuera del ciclo de Express,
  // Winston lo captura en logs/exceptions.log y el proceso continúa (exitOnError: false)
  router.get("/test-exception", function (req, res) {
    res.json({ message: "Excepción lanzada. Revisa logs/exceptions.log" });
    // setTimeout saca el throw fuera del middleware de Express,
    // convirtiéndolo en una excepción no capturada (uncaughtException)
    setTimeout(() => {
      throw new Error("Excepción de prueba no capturada");
    }, 100);
  });

  // Ruta para probar rejectionHandlers (promesa rechazada sin catch)
  // Acceder a: GET /test-rejection
  // Winston lo captura en logs/rejections.log
  router.get("/test-rejection", function (req, res) {
    res.json({ message: "Promesa rechazada. Revisa logs/rejections.log" });
    // Promesa rechazada sin .catch() → unhandledRejection
    Promise.reject(new Error("Promesa rechazada de prueba sin catch"));
  });
}

export default router;
