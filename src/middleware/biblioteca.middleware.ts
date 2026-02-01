import type { NextFunction, Request, Response } from "express";
import { validarPartialBibliotecaCampos } from "../utils/Biblioteca/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareBibliotecaCreate(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = validarPartialBibliotecaCampos(data);
    console.log(result);

    if (!result.success) {
        middlewareError(result.error, res);
        return
    }
    const { id, volumeInfo } = result.data;
    req.body = { id, volumeInfo };
    next();
}

export function middlewareBibliotecaId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const result = validarPartialBibliotecaCampos({ id });

    if (!result.success) {
        middlewareError(result.error, res);
        return
    }
    const { id: idParam } = result.data as { id: string };
    req.params = { id: idParam.toString() };
    next();
}