import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import { validarBibliotecaBooksCreate, validarBibliotecaBooksUpdate, validarBibliotecaBooksId } from "../../utils/Biblioteca/schemaLibro.js";

import { middlewareError } from "../../utils/middleware.js";

/* =========================
   CREATE (POST)
   ➜ NO recibe id
========================= */
export function middlewareBibliotecaBooksCreate(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaBooksCreate(req.body);

        const { volumeInfo } = result;

        req.body = { volumeInfo };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

/* =========================
   UPDATE (PUT / PATCH)
   ➜ parcial pero NO vacío
========================= */
export function middlewareBibliotecaBooksUpdate(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaBooksUpdate(req.body);

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
export function middlewareBibliotecaBooksId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaBooksId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = {
        id: result.data.id,
    };

    next();
}
