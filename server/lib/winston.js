// Importando el core de winston
// y la función format de winston
import winston, { format } from "winston";
import path from "path";
import fs from "fs";
// Transport para rotación diaria de archivos (se instala como dependencia)
import DailyRotateFile from "winston-daily-rotate-file";

// Se desestructuran funciones para realizar la
// composición del formato
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando variable del directorio raiz
const __rootdir = path.resolve(process.cwd());

// Directorio de logs en la raiz del proyecto
const logsDir = path.join(__rootdir, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Se define un esquema de colores
// segun el grado de severidad
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Agregando el esquema de colores a Winston
winston.addColors(colors);

// ==== Se crean las plantillas para los formatos ====

// Formato para la consola
const myConsoleFormat = combine(
  // Agregando colores la formato
  colorize({ all: true }),
  // Agregando una etiqueta al log
  label({ label: "📣" }),
  // Agregando Fecha
  timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  // Función de impreson
  printf((info) => `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`),
);

// Formato para los archivos (JSON, con timestamp ISO)
const myFileFormat = combine(
  // Quitando todo tipo de colorizacion
  format.uncolorize(),
  // Agregando fecha (ISO, más útil para máquinas)
  timestamp(),
  // Salida en JSON para facilitar parsing/ingest
  format.json(),
);

// Creando el objeto de opciones para cada transporte
const options = {
  infoFile: {
    level: "info",
    filename: path.join(__rootdir, "logs", "info.log"),
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: "warn",
    filename: path.join(__rootdir, "logs", "warn.log"),
    handleExceptions: false,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: "error",
    filename: path.join(__rootdir, "logs", "error.log"),
    handleExceptions: false,
    maxSize: 5242880, // 5MB
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

// Se crea instancia de logger
// - Usamos un transport diario (`DailyRotateFile`) para el log principal
//   que facilita retención por fecha y compresión de archivos.
// - Mantenemos archivos separados para `warn` y `error` para alertas.
// - `exceptionHandlers` y `rejectionHandlers` permiten capturar
//   errores y promesas rechazadas no manejadas en archivos independientes.
const logger = winston.createLogger({
  // En esta linea se define el nivel mínimo de logeo,
  // es decir, se logeará todo lo que sea igual o superior a este nivel
  transports: [
    // Log principal con rotación por fecha (ej: app-2026-03-05.log)
    new DailyRotateFile(options.dailyRotateFile),
    // Archivo legible por humanos (útil para clase/demo)
    new winston.transports.File(options.readableFile),
    // Archivo de nivel info
    new winston.transports.File(options.infoFile),
    // Warn y error en archivos separados para procesos de alerta
    new winston.transports.File(options.warnFile),
    new winston.transports.File(options.errorFile),
    // Consola para desarrollo (colores y formato legible)
    new winston.transports.Console(options.console),
  ],
  // Captura excepciones y promesas rechazadas en archivos separados
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, "exceptions.log") }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, "rejections.log") }),
  ],
  exitOnError: false, // No finaliza en excepciones no manejadas
});

/*
Por defecto Morgan envía la salida exclusivamente a la consola, algo asi:
 Morgan --->[logs]---> consola
Lo que haremos a continuación sera definir una función llamada "write" que será parte de un objeto que se asignará a la propiedad stream del logger, esta función será capaz de recibir la salida que genera Morgan "message" y redirigirla a winston como informativa
Usaremos el nivel informativo para que tanto el transportador archivo como el de consola tomen el 
Morgan --->[logs]---> Winston ---> [Logs a transportes informativos]
*/

// Estableciendo un flujo de entrada que servira
// para interceptar el log de morgan
logger.stream = {
  write(message) {
    logger.info(message.trim());
  },
};

// Por ultimo exportamos el logger
export default logger;
