import type { Request, Response } from "express";
import { HttpCodesModel } from "../models/local/http-codes.model.js";
import { formatoRespuesta, validarMessageError } from "../utils/index.js";

const httpCodesModel = new HttpCodesModel();

export class HttpCodesController {
    getHttpCodesAll = async (_req: Request, res: Response) => {
        try {
            const dataHttpCodes = await httpCodesModel.getHttpCodes();

            const response = formatoRespuesta({ ok: true, message: "Datos obtenidos correctamente", error: null, data: dataHttpCodes });
            res.status(200).json(response);

        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            const response = formatoRespuesta({ ok: false, message: message, error: error, data: null });
            res.status(500).json(response);
        }
    };

    getHttpCode = async (req: Request, res: Response) => {
        try {
            const code = req.params.code as string;

            const httpCodeFound = await httpCodesModel.getHttpCode({ code });

            const response = formatoRespuesta({ ok: true, message: "Datos obtenidos correctamente", error: null, data: httpCodeFound });
            res.status(200).json(response);
        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            const response = formatoRespuesta({ ok: false, message: message, error: error, data: null });
            res.status(400).json(response);
        }
    };


}
