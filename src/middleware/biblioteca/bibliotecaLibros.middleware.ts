import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import { validarBibliotecaLibrosCrear, validarBibliotecaLibrosModificar, validarBibliotecaLibrosId } from "../../utils/Biblioteca/schemaLibro.js";
import { middlewareError } from "../../utils/middleware.js";

export function middlewareBibliotecaLibrosCrear(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaLibrosCrear(req.body);

        const { volumeInfo } = result;

        req.body = { volumeInfo };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

export function middlewareBibliotecaLibrosModificar(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLibrosModificar(req.body);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.body = result.data;
    next();
}

export function middlewareBibliotecaLibrosId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLibrosId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = { id: result.data.id };

    next();
}
