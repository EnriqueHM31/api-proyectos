import type { NextFunction, Request, Response } from "express";
import { validarPartialEmailCampos } from "../utils/Email/schema.js";

export function middlewareEmail(req: Request, res: Response, next: NextFunction) {
    const { email, comentario, page } = req.body;

    const result = validarPartialEmailCampos({ email, comentario, page });

    if (!result.success) {
        const message = result.error.issues.map(issue => issue.message);
        res.status(400).json({
            ok: false,
            message: "Error en los parámetros",
            error: {
                code: result.error.name,
                message: message.join(", "),
            },
            data: null,
        });
        return
    }
    const { email: emailParam, comentario: comentarioParam, page: pageParam } = result.data;
    req.body = { email: emailParam, comentario: comentarioParam, page: pageParam };
    next();
}
