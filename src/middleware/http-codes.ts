import type { NextFunction, Request, Response } from "express";
import { validarPartialHttpCodesCampos } from "../utils/HttpCodes/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareHttpCodes(req: Request, res: Response, next: NextFunction) {
    const { code } = req.params;
    console.log({ code });
    const result = validarPartialHttpCodesCampos({ code });

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }
    const { code: codeParam } = result.data;
    req.params = { code: codeParam.toString() };
    next();
}
