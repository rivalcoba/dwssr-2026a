import express from "express";

// Importando los controladores de usuarios
import { getUsers } from "./users.controller.js";

// Importando el Router de express para 
// poder establecer las rutas
const router = express.Router();

// Definiendo las rutas para los usuarios

// GET '/user/login' - Ruta para el login de usuarios
router.get("/login", login);

// GET '/user/logout' - Ruta para el logout de usuarios
router.get("/logout", logout);

// GET '/user/register' - Ruta para el registro de usuarios
router.get("/register", register);

// GET '/user' - Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Exportando el router de usuarios
export default router;
