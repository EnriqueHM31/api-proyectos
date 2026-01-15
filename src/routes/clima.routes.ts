import { Router } from "express";
import { ClimaController } from "../controllers/clima.controller.js";
import { API_KEY_CLIMA, BASE_URL_CLIMA } from "../constants/index.js";
export const climaRouter = Router();


const url = BASE_URL_CLIMA + API_KEY_CLIMA;
const climaController = new ClimaController(url);

climaRouter.get("/:lugar", climaController.getClima);