import HttpCodes from "../data/http-codes.json" with { type: "json" };
import type { Request, Response } from "express";

export class HttpCodesController {
    getHttpCodesAll = (_req: Request, res: Response) => {
        console.log("Solicitud recibida para obtener códigos HTTP");

        res.status(200).json(HttpCodes);
    };

    getHttpCode = (req: Request, res: Response) => {
        console.log("Solicitud recibida para obtener un código HTTP");

        const code = req.params.code;
        const httpCode = HttpCodes.find((c) => Number(c.code) === Number(code));

        if (!httpCode) {
            res.status(404).json({ error: "No se encontró el código" });
        } else {
            res.status(200).json(httpCode);
        }
    };
}
