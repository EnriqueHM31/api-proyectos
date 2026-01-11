import { Router } from "express";
import { viewRoutes } from "./view.routes.js";

const router = Router();

router.use("/", viewRoutes);

export default router;
