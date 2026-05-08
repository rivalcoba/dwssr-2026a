// importando biblioteca winston
import winston, { format } from "winston";
import path from "node:path";
import fs from "node:fs";
// Importando biblioteca de transporte
import DailyRotateFile from "winston-daily-rotate-file";

// Desestructurando funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando los directorios raiz
const __rootdir = path.resolve(process.cwd());

// Creando la ruta del directorio de logs en
// la raiz del proyecto
const logsDir = path.join(__rootdir, "logs");
// Rutina que crea la carpeta donde iran los logs solo
// en caso de no exisitr
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Definiendo esquema de colores
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Agregando esquema de colores a winston
winston.addColors(colors);

// Creamos los formatos de salida para los diferentes transportes
const myConsoleFormat = combine(
  // Agregando colores a este formato
  colorize({ all: true }),
  // Agregando una etiqueta a log
  label({ label: "📢" }),
  // Agrego formato de fecha
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  // Funcion de impresion
  printf(
    (info) =>
      `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`,
  ),
);

// Formato para los archivos
const myFileFormat = combine(
  // Quitando colorizacion
  format.uncolorize(),
  // Agregamos fecha en formato ISO
  timestamp(),
  // Salida en formato JSON
  format.json(),
);

// Creando los transportes
// Creando el objeto de opciones para cada transporte
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__rootdir, "logs", "error.log"),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    filename: path.join(logsDir, "app-readable.log"),
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
  },
  dailyRotateFile: {
    filename: path.join(logsDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

// Creando el una instancia del Logger
/*
  Usaremos un transport diario (DailyRotateFile) para
  el log principal, esto facilita la retencion
  por fecha y la compresión de archivos.

  Para los demas logs mantenemos archivos separados.
*/

const logger = winston.createLogger({
  transports: [
    // Log principal con rotacion por fecha
    new DailyRotateFile(options.dailyRotateFile),
    // Archivo legible para humanos
    new winston.transports.File(options.readableFile),
    // Log de errores en un archivo por separado
    new winston.transports.File(options.errorFile),
    // Log para la consola de desarrollo (colores, y formato)
    new winston.transports.Console(options.console),
  ],
  // Captura de excepciones
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "exception.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "rejection.log"),
    }),
  ],
  exitOnError: false,
});

// Finalmente exportamos el logger
export default logger;
