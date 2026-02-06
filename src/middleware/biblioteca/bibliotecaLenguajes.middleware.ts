import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import {
    validarBibliotecaLenguajesCrear,
    validarBibliotecaLenguajesModificar,
    validarBibliotecaLenguajesId,
} from "../../utils/Biblioteca/schemaLenguajes.js";

import { middlewareError } from "../../utils/middleware.js";

/* =========================
   Crear (POST)
   ➜ NO recibe id
========================= */
export function middlewareBibliotecaLenguajesCrear(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaLenguajesCrear(req.body);

        // solo nombre y descripcion
        const { nombre, abreviacion } = result;

        req.body = { nombre, abreviacion };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

/* =========================
   Modificar (PUT / PATCH)
   ➜ todo opcional
========================= */
export function middlewareBibliotecaLenguajesModificar(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLenguajesModificar(req.body);

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
export function middlewareBibliotecaLenguajesId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaLenguajesId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = {
        id: result.data.id,
    };

    next();
}
