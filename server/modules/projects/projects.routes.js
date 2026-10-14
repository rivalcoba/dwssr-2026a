// Project routes module
import express from "express";
// Routes for handling project-related requests
import { showDashboard, showCreateForm } from "./projects.controller.js";
// Initialize the router for project routes
const router = express.Router();

// Route to show the projects dashboard
// GET '/projects' - Muestra el Dashboard de proyectos
router.get("/", showDashboard);

// Route to show the create project form
// GET '/projects/create' - Muestra el formulario para crear un nuevo proyecto
router.get("/create", showCreateForm);

export default router;