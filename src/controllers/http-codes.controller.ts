import HttpCodes from "../data/http-codes.json" with { type: "json" };
import type { Request, Response } from "express";

export class HttpCodesController {
    getHttpCodes = (_req: Request, res: Response) => {
        console.log("Solicitud recibida para obtener códigos HTTP");

        res.status(200).json(HttpCodes);
    };
}
