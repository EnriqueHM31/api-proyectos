import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import {
    validarBibliotecaCategoriesCreate,
    validarBibliotecaCategoriesUpdate,
    validarBibliotecaCategoriesId,
} from "../../utils/Biblioteca/schemaCategories.js";

import { middlewareError } from "../../utils/middleware.js";

/* =========================
   CREATE (POST)
   ➜ NO recibe id
========================= */
export function middlewareBibliotecaCategoriesCreate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = validarBibliotecaCategoriesCreate(req.body);

        // solo nombre y descripcion
        const { nombre, descripcion } = result;

        req.body = { nombre, descripcion };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

/* =========================
   UPDATE (PUT / PATCH)
   ➜ todo opcional
========================= */
export function middlewareBibliotecaCategoriesUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = validarBibliotecaCategoriesUpdate(req.body);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.body = result.data;
    next();
}

/* =========================
   ID PARAM (GET / DELETE)
   ➜ solo UUID
========================= */
export function middlewareBibliotecaCategoriesId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = validarBibliotecaCategoriesId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = {
        id: result.data.id,
    };

    next();
}
