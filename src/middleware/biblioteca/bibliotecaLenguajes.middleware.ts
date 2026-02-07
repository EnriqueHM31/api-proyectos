import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import { validarBibliotecaLenguajesCrear, validarBibliotecaLenguajesModificar, validarBibliotecaLenguajesId } from "../../utils/Biblioteca/schemaLenguajes.js";

import { middlewareError } from "../../utils/middleware.js";


export function middlewareBibliotecaLenguajesCrear(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaLenguajesCrear(req.body);

        const { nombre, abreviacion } = result;

        req.body = { nombre, abreviacion };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}


export function middlewareBibliotecaLenguajesModificar(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLenguajesModificar(req.body);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.body = result.data;
    next();
}

export function middlewareBibliotecaLenguajesId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLenguajesId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = { id: result.data.id };

    next();
}
