import type { NextFunction, Request, Response } from "express";
import { validarPartialGeolocalizacionCampos } from "../utils/Geolocalizacion/schema.js";
import { middlewareError } from "../utils/middleware.js";

export function middlewareIpGeo(req: Request, res: Response, next: NextFunction) {
    const { ip } = req.params;

    const result = validarPartialGeolocalizacionCampos({ ip });

    if (!result.success) {
        middlewareError(result.error, res);
        return;
    }

    const { ip: ipParam } = result.data;
    req.params = { ip: ipParam };
    next();
}
