import type { Request, Response } from "express";
import { ClimaModel } from "../models/local/clima.model.js";
import { crearUrlClima } from "../utils/Clima/index.js";
import { formatoRespuesta, validarMessageError } from "../utils/index.js";

const climaModel = new ClimaModel();

export class ClimaController {
    constructor(private readonly urlClima: string) {}

    getClima = async (req: Request, res: Response) => {
        try {
            const { lugar } = req.params as { lugar: string };
            const { days } = req.query as { days: string };

            const url = crearUrlClima(this.urlClima, { lugar, days });

            const data = await climaModel.getClima({ url });

            if (data.error) {
                const response = formatoRespuesta({ ok: false, message: data.error.message, error: data.error, data: null });
                res.status(400).json(response);
            }

            const response = formatoRespuesta({ ok: true, message: "Datos obtenidos correctamente", error: null, data });
            res.status(200).json(response);
        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            if (!res.headersSent) {
                const response = formatoRespuesta({ ok: false, message: message, error: error, data: null });
                res.status(500).json(response);
            }
        }
    };
}
