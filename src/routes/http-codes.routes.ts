import { Router } from "express";
import { HttpCodesController } from "../controllers/http-codes.controller.js";
import { middlewareHttpCodes } from "../middleware/http-codes.js";

export const httpCodesRouter = Router();

const httpCodesController = new HttpCodesController();

httpCodesRouter.get("/", httpCodesController.getHttpCodesAll);

httpCodesRouter.get("/:code", middlewareHttpCodes, httpCodesController.getHttpCode);
