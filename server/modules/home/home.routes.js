import express from "express";
import { renderHome } from "./home.controller.js";

const router = express.Router();

router.get("/", renderHome);

export default router;
