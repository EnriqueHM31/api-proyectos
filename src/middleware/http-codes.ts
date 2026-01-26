import type { NextFunction, Request, Response } from "express";
import { validarPartialHttpCodesCampos } from "../utils/HttpCodes/schema.js";

export function middlewareHttpCodes(req: Request, res: Response, next: NextFunction) {
    const { code } = req.params;
    console.log({ code });
    const result = validarPartialHttpCodesCampos({ code });

    if (!result.success) {
        const message = result.error.issues[0]?.message ?? "Error en los parámetros";
        const path = result.error.issues[0]?.path ?? "Datos";
        res.status(400).json({
            ok: false,
            message: "Error en los parámetros",
            error: {
                code: result.error.name,
                message: `${path}: ${message}`,
            },
            data: null,
        });
        return
    }
    const { code: codeParam } = result.data;
    req.params = { code: codeParam.toString() };
    next();
}