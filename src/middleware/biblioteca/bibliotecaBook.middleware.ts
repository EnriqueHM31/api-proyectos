import type { NextFunction, Request, Response } from "express";
import { validarPartialBibliotecaBooksCampos } from "../../utils/Biblioteca/schemaBook.js";
import { middlewareError } from "../../utils/middleware.js";

export function middlewareBibliotecaBooksCreate(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = validarPartialBibliotecaBooksCampos(data);
    console.log(result);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }
    const { id, volumeInfo } = result.data;
    req.body = { id, volumeInfo };
    next();
}

export function middlewareBibliotecaBooksId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const result = validarPartialBibliotecaBooksCampos({ id });

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }
    const { id: idParam } = result.data as { id: string };
    req.params = { id: idParam.toString() };
    next();
}
