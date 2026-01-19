import type { Request, Response } from "express";
import { ClimaModel } from "../models/local/clima.model.js";
import { crearUrlClima, validarDays, validarString } from "../utils/Clima/index.js";
import { validarMessageError } from "../utils/index.js";

const climaModel = new ClimaModel();

export class ClimaController {
    constructor(private readonly urlClima: string) { }

    getClima = async (req: Request, res: Response) => {
        try {
            const { lugar: lugarParam } = req.params;
            const { days: daysParam } = req.query;

            const days = validarDays(daysParam);
            const lugar = validarString(lugarParam);
            const url = crearUrlClima(this.urlClima, { lugar, days });

            const data = await climaModel.getClima({ url });

            res.status(200).json(data);

        } catch (error) {

            const message = validarMessageError(error, "Error interno del servidor");
            if (!res.headersSent) {
                res.status(500).json({
                    error: message
                });
            }
        }

    }
}