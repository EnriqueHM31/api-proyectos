import type { NextFunction, Request, Response } from "express";
import type { ZodError } from "zod";

import {
    validarBibliotecaUsuarioCrear,
    validarBibliotecaUsuarioModificar,
    validarBibliotecaUsuarioId,
    validarBibliotecaUsuarioLogin,
} from "../../utils/Biblioteca/schemaUsuario.js";
import { middlewareError } from "../../utils/middleware.js";

export const middlewareBibliotecaUsuarioLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = validarBibliotecaUsuarioLogin(req.body);

        const { username, password } = result;
        req.body = { username, password };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
};

export function middlewareBibliotecaUsuarioCrear(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validarBibliotecaUsuarioCrear(req.body);

        const { username, password, correo } = result;

        req.body = { username, password, correo };
        next();
    } catch (error) {
        middlewareError(error as ZodError, res);
    }
}

export function middlewareBibliotecaUsuarioModificar(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaUsuarioModificar(req.body);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.body = result.data;
    next();
}

export function middlewareBibliotecaUsuarioId(req: Request, res: Response, next: NextFunction) {
    const result = validarBibliotecaUsuarioId(req.params);

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    req.params = { id: result.data.id };

    next();
}
