import type { Request, Response } from "express";
import { IpModel } from "../models/local/ip.model.js";
import { crearUrlGeolocalizacion } from "../utils/Geolocalizacion/index.js";
import { validarMessageError } from "../utils/index.js";
import { formatoRespuesta } from "../utils/index.js";

const modelIp = new IpModel();

export class IpController {
    constructor(private readonly urlGeolocalizacion: string) {}

    getIp = async (req: Request, res: Response) => {
        try {
            const { ip } = req.params as { ip: string };

            const urlGeolocalizacion = crearUrlGeolocalizacion(this.urlGeolocalizacion, ip);

            const data = await modelIp.getIp({ url: urlGeolocalizacion });

            const response = formatoRespuesta({ ok: true, message: "Datos obtenidos correctamente", error: null, data });
            res.status(200).json(response);
        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            if (!res.headersSent) {
                const response = formatoRespuesta({ ok: false, message: "Error interno del servidor", error: message, data: null });
                res.status(500).json(response);
            }
        }
    };
}
