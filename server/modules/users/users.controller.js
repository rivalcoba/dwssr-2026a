// Controladores de usuarios
import { listUsers } from "./users.service.js";

// Actions Methods for Users

// GET '/user/login' - Login de usuarios
export const login = (req, res) => {
  // Lógica de login de usuarios
  res.send("Login de usuario 🚧 Under construction 🚧");
};

// GET '/user/logout' - Logout de usuarios
export const logout = (req, res) => {
  // Lógica de logout de usuarios
  res.send("Logout de usuario 🚧 Under construction 🚧");
};

// GET '/user/register' - Registro de usuarios
export const register = (req, res) => {
  // Lógica de registro de usuarios
  res.send("Registro de usuario 🚧 Under construction 🚧");
};

// GET '/user' - Obtener todos los usuarios
export const getUsers = (req, res) => {
  const users = listUsers();
  res.json({ data: users });
};
