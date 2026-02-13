import type { Request, Response, NextFunction } from "express";
import { formatoRespuesta } from "../../utils/index.js";

export const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json(
            formatoRespuesta({
                ok: false,
                message: "No se ha iniciado sesión",
                data: null,
                error: null,
            })
        );
        return
    }

    // opcional: adjuntar token al request para uso posterior
    req.cookies.token = token as string;

    next();
};
