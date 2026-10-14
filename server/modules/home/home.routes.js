import express from "express";
import { renderHome, about } from "./home.controller.js";

const router = express.Router();

// Enrutamos
// GET '/'
// GET '/home'
// GET '/index
router.get(['/', '/home', '/index'], renderHome);

// GET '/about' - Muestra la página de información
router.get("/about", about);

export default router;
