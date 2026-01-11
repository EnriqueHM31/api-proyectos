import { Router } from "express";
import { getProjects } from "../utils/projects.js";

export const viewRoutes = Router();

viewRoutes.get("/", (_req, res) => {
    res.render("home", {
        projects: getProjects(),
    });
});