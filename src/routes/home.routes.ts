import { Router } from "express";
import { viewRoutes } from "./view.routes.js";

export const homeRouter = Router();

homeRouter.use("/", viewRoutes);

homeRouter.get("/health", (_req, res) => {
    res.send({
        status: "OK",
        message: "API is running",
        time: process.uptime(),
    });

});
