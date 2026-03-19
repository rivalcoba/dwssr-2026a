import logger from "../../lib/winston.js";

export function testLogs(req, res) {
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
}

export function testException(req, res) {
  res.json({ message: "Excepción lanzada. Revisa logs/exceptions.log" });
  // setTimeout saca el throw fuera del middleware de Express,
  // convirtiéndolo en una excepción no capturada (uncaughtException)
  setTimeout(() => {
    throw new Error("Excepción de prueba no capturada");
  }, 100);
}

export function testRejection(req, res) {
  res.json({ message: "Promesa rechazada. Revisa logs/rejections.log" });
  // Promesa rechazada sin .catch() → unhandledRejection
  Promise.reject(new Error("Promesa rechazada de prueba sin catch"));
}
