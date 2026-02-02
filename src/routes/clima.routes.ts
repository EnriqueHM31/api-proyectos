import { Router } from "express";
import { API_KEY_CLIMA, BASE_URL_CLIMA } from "../constants/index.js";
import { ClimaController } from "../controllers/clima.controller.js";
import { middlewareClima } from "../middleware/clima.js";

export const climaRouter = Router();

const url = BASE_URL_CLIMA + API_KEY_CLIMA;
const climaController = new ClimaController(url);

climaRouter.get("/:lugar", middlewareClima, climaController.getClima);
