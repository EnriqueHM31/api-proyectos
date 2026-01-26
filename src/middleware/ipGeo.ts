import type { NextFunction, Request, Response } from "express";
import { validarPartialGeolocalizacionCampos } from "../utils/Geolocalizacion/schema.js";

export function middlewareIpGeo(req: Request, res: Response, next: NextFunction) {
    const { ip } = req.params;

    const result = validarPartialGeolocalizacionCampos({ ip });

    if (!result.success) {
        const message = result.error.issues[0]?.message ?? "Error en los parámetros";
        const path = result.error.issues[0]?.path ?? "Datos";

        res.status(400).json({
            ok: false,
            message: "Error en los parámetros",
            error: {
                code: result.error.name,
                message: `${path}: ${message}`,
            },
            data: null,
        });
        return
    }

    const { ip: ipParam } = result.data;
    req.params = { ip: ipParam };
    next();
}