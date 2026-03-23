# 🟩 NodeJs

[Node](https://nodejs.org/en) es un entorno de ejecución Javascript
multi plataforma de código abierto y gratuito.

Dentro de los frameworks para crear
servidores web para Node tenemos:

- [Fastify](https://fastify.dev/)
- [AdonisJs](https://adonisjs.com/)
- [NestJs](https://nestjs.com/)
- [Koa](https://koajs.com/)
- [ExpressJs](https://expressjs.com/)

# 🍵 ExpressJs

Express es un _framework_ para Node, mínimo, flexible no impositivo tanto
en el flujo de trabajo como en la
arquitectura del proyecto.

El presente proyecto esta desarrollado
en expressJs.

# 📦 ESM

Los ECMAScript Modules (ESM) representan el estándar nativo
para organizar y modularizar código de Javascript.
El Express-Generator genera un proyecto usando el antigüo
estándar llamado _CommonJS_ que usa las sentencias `require`
en nuevo estándar usa `export/import`.

Migrar a ESM ofrece las siguientes ventajas:

- Sintaxis moderna y consistente
- Mejor análisis estático**
- Importaciones asíncronas con `import()`
- Es el futuro del ecosistema

# 😈 Nodemon

[Nodemon](https://nodemon.io/) es un paquete que actua como
un _wrapper_ (envoltorio) para Node.Js
Su función es observar archivos
en el directorio de tu proyecto y
reiniciar automáticamente la
aplicación cuando detecta cambios
guardados.