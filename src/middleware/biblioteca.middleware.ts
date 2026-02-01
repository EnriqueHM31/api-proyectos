import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";
import { validarPartialBibliotecaCampos } from "../utils/Biblioteca/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareBibliotecaCreate(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {

        const result = validarPartialBibliotecaCampos(data);
        console.log(result);

        if (!result.success) {
            middlewareError(result.error, res);
            return
        }
        const { id, volumeInfo } = result.data;
        req.body = { id, volumeInfo };
        next();
    } catch (error) {
        console.log(error);
        middlewareError(error as ZodError, res);
        return
    }
}