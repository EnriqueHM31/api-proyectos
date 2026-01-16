import { Router } from "express";
import { viewRoutes } from "./view.routes.js";

export const homeRouter = Router();

homeRouter.use("/", viewRoutes);

