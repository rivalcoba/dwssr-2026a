import express from "express";
import {
  testException,
  testLogs,
  testRejection,
} from "./diagnostics.controller.js";

const router = express.Router();

// Ruta de prueba para verificar los diferentes niveles de log
// Acceder a: GET /test-logs
router.get("/test-logs", testLogs);

// Rutas de prueba para exceptions y rejections (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
  // Ruta para probar exceptionHandlers (excepción no capturada)
  // Acceder a: GET /test-exception
  // ADVERTENCIA: Esto lanza un error fuera del ciclo de Express,
  // Winston lo captura en logs/exceptions.log y el proceso continúa (exitOnError: false)
  router.get("/test-exception", testException);

  // Ruta para probar rejectionHandlers (promesa rechazada sin catch)
  // Acceder a: GET /test-rejection
  // Winston lo captura en logs/rejections.log
  router.get("/test-rejection", testRejection);
}

export default router;
