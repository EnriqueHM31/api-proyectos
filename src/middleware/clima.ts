import type { NextFunction, Request, Response } from "express";
import { validarPartialClimaCampos } from "../utils/Clima/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareClima(req: Request, res: Response, next: NextFunction) {
    const { days } = req.query as { days: string };
    const { lugar } = req.params as { lugar: string };

    console.log({ days, lugar });
    const result = validarPartialClimaCampos({ lugar, days });

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }
    const { lugar: lugarParam, days: daysParam } = result.data;
    req.params = { lugar: lugarParam, days: daysParam.toString() };
    next();
}
