import { Router } from "express";
import { homeController } from "../controllers/home.controller.js";

export const viewRoutes = Router();

viewRoutes.get("/", homeController.getHome);
