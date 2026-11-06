import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Establece el entorno de prueba a Node.js
    environment: "node",
    // Incluye solo los archivos de prueba dentro del directorio 'server' que terminen en '.test.js'
    include: ["server/**/*.test.js"],
  },
});
