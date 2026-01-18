import HttpCodes from "../data/http-codes.json" with { type: "json" };
import type { Request, Response } from "express";
import type { HttpCode } from "../types/http-codes.d.ts";

export class HttpCodesController {
    getHttpCodesAll = (_req: Request, res: Response) => {
        console.log("Solicitud recibida para obtener códigos HTTP");

        res.status(200).json(HttpCodes);
    };

    getHttpCode = (req: Request, res: Response) => {
        console.log("Solicitud recibida para obtener un código HTTP");

        const code = req.params.code;
        const httpCode = HttpCodes as HttpCode[] | undefined;

        if (!code) {
            res.status(400).json({ error: "Falta el código" });
            return;
        }

        const codeNumber = parseInt(code as string);

        if (isNaN(codeNumber)) {
            res.status(400).json({ error: "El código debe ser un número" });
            return;
        }

        httpCode?.forEach((httpCode) => {
            if (httpCode.code === codeNumber) {
                res.status(200).json(httpCode);
                return;
            }
        });

    };
}
