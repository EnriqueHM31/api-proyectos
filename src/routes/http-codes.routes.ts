import { Router } from "express";

import { HttpCodesController } from "../controllers/http-codes.controller.js";

export const httpCodesRouter = Router();

const httpCodesController = new HttpCodesController();

httpCodesRouter.get("/", httpCodesController.getHttpCodesAll);

httpCodesRouter.get("/:code", httpCodesController.getHttpCode);