import type { NextFunction, Request, Response } from "express";
import { validarPartialClimaCampos } from "../utils/Clima/schema.js";

export function middlewareClima(req: Request, res: Response, next: NextFunction) {
    const { days } = req.query as { days: string };
    const { lugar } = req.params as { lugar: string };

    console.log({ days, lugar });
    const result = validarPartialClimaCampos({ lugar, days });

    if (!result.success) {
        const message = result.error.issues[0]?.message ?? "Error en los parámetros";
        const path = result.error.issues[0]?.path ?? "Datos";

        res.status(400).json({
            ok: false,
            message: "Error en los parámetros",
            error: {
                code: result.error.name,
                message: `${path}:  ${message}`,
            },
            data: null,
        });
        return
    }
    const { lugar: lugarParam, days: daysParam } = result.data;
    req.params = { lugar: lugarParam, days: daysParam.toString() };
    next();
}