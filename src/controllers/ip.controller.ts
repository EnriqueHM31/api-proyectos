import type { Request, Response } from "express";
import { IpModel } from "../models/local/ip.model.js";
import { crearUrlGeolocalizacion } from "../utils/Geolocalizacion/index.js";
import { validarMessageError } from "../utils/index.js";

const modelIp = new IpModel();

export class IpController {
    constructor(private readonly urlGeolocalizacion: string) { }

    getIp = async (req: Request, res: Response) => {
        try {
            const { ip } = req.params as { ip: string };


            const urlGeolocalizacion = crearUrlGeolocalizacion(this.urlGeolocalizacion, ip);

            const data = await modelIp.getIp({ url: urlGeolocalizacion });

            res.status(200).json({
                ok: true,
                message: "Datos obtenidos correctamente",
                data: data,
                error: null
            });

        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            if (!res.headersSent) {
                res.status(500).json(
                    {
                        ok: false,
                        data: null,
                        message: "Error interno del servidor",
                        error: message
                    }
                );
            }
        }
    };
}
