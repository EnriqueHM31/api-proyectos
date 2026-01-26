import type { Request, Response } from "express";
import { HttpCodesModel } from "../models/local/http-codes.model.js";
import { ValidarNumero, ValidarStringVacio } from "../utils/HttpCodes/index.js";
import { validarMessageError } from "../utils/index.js";

const httpCodesModel = new HttpCodesModel();

export class HttpCodesController {
    getHttpCodesAll = async (_req: Request, res: Response) => {
        try {
            const dataHttpCodes = await httpCodesModel.getHttpCodes();

            res.status(200).json({
                ok: true,
                message: "Datos obtenidos correctamente",
                data: dataHttpCodes,
                error: null
            });

        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            res.status(500).json({
                ok: false,
                data: null,
                message: message,
                error: error
            });
        }
    };

    getHttpCode = async (req: Request, res: Response) => {
        try {
            const code = req.params.code as string;

            const httpCodeFound = await httpCodesModel.getHttpCode({ code });

            res.status(200).json({
                ok: true,
                message: "Datos obtenidos correctamente",
                data: httpCodeFound,
                error: null
            });
        } catch (error) {
            const message = validarMessageError(error, "Error interno del servidor");
            res.status(400).json({
                ok: false,
                data: null,
                message: message,
                error: error
            });
        }
    };


}
