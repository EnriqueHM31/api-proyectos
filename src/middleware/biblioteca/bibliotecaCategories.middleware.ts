import { validarPartialBibliotecaCategoriesCampos } from "../../utils/Biblioteca/schemaCategories.js";
import type { NextFunction, Request, Response } from "express";
import { middlewareError } from "../../utils/middleware.js";

export function middlewareBibliotecaCategoriesCreate(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const result = validarPartialBibliotecaCategoriesCampos(data);
    console.log(result);

    if (!result.success) {
        middlewareError(result.error, res);
        return
    }
    const { id, nombre, descripcion } = result.data;
    req.body = { id, nombre, descripcion };
    next();
}

export function middlewareBibliotecaCategoriesId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const result = validarPartialBibliotecaCategoriesCampos({ id });

    if (!result.success) {
        middlewareError(result.error, res);
        return
    }
    const { id: idParam } = result.data as { id: string };
    req.params = { id: idParam.toString() };
    next();
}   