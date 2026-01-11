import { Router } from "express";
import { IpController } from "../controllers/ip.controller.js";
import { URL_GEOLOCALIZACION_IP, API_KEY_IP_GEOLOCALIZACION } from "../constants/geolocalizacionIp/index.js";
import { creacionAPI } from "../utils/Geolocalizacion/index.js";

const url = creacionAPI(URL_GEOLOCALIZACION_IP, API_KEY_IP_GEOLOCALIZACION);

export const geoIpRouter = Router();

const ipController = new IpController(url);

geoIpRouter.get("/:ip", ipController.getIp);
