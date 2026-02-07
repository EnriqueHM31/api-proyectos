import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import { validarBibliotecaCategoriasCreate, validarBibliotecaCategoriasUpdate, validarBibliotecaCategoriasId } from "../../utils/Biblioteca/schemaCategorias.js";
import { middlewareError } from "../../utils/middleware.js";


export function middlewareBibliotecaCategoriasCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaCategoriasCreate(req.body);

        // solo nombre y descripcion
        const { nombre, descripcion } = result;

        req.body = { nombre, descripcion };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

export function middlewareBibliotecaCategoriasUpdate(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaCategoriasUpdate(req.body);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.body = result.data;
    next();
}

export function middlewareBibliotecaCategoriasId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaCategoriasId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = { id: result.data.id };

    next();
}
