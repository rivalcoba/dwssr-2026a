import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1) ignores (build del front, etc.)
  {
    ignores: [
      "node_modules/**",
      "dist/**",
    ],
  },
  // 2) backend: server/**
  {
    files: ["server/**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // backend normalmente permite logs
      "no-console": "off",
      // ejemplo de regla específica para backend: permitir variables no usadas si empiezan con _
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    },
  },
  // 3) frontend: src/**
  {
    files: ["src/**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ejemplo de diferencia de reglas en front
      "no-alert": "warn",
      // si quieres ser más estricto en front:
      // "no-console": "warn",
    },
  },
  // 4) opcional: Si tienes JS dentro de public/
  {
    files: ["public/**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
]);
