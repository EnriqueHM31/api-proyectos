import type { Request, Response } from "express";
import { getProjects } from "../utils/projects.js";
import type { Project } from "../types/project.js";

export const homeController = {
    getHome: (_req: Request, res: Response) => {
        const projects: Project[] = getProjects();
        res.render("home", { projects });
    },
};
