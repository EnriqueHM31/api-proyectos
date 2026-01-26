import type { NextFunction, Request, Response } from "express";
import { validarPartialEmailCampos } from "../utils/Email/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareEmail(req: Request, res: Response, next: NextFunction) {
    const { email, comentario, page } = req.body;

    const result = validarPartialEmailCampos({ email, comentario, page });

    if (!result.success) {
        middlewareError(result.error, res);
        return
    }
    const { email: emailParam, comentario: comentarioParam, page: pageParam } = result.data;
    req.body = { email: emailParam, comentario: comentarioParam, page: pageParam };
    next();
}
