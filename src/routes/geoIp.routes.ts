import { Router } from "express";
import { ipController } from "../controllers/ip.controller.js";

export const geoIpRouter = Router();

geoIpRouter.get("/:ip", ipController.getIp);
