import type { Response } from "express";
import type { ZodError } from "zod";

export function middlewareError(result: ZodError, res: Response) {
    const message = result.issues[0]?.message ?? "Error en los parámetros";

    res.status(400).json({
        ok: false,
        message: "Error en los parámetros",
        error: {
            code: result.name,
            message: `Error: ${message}`,
        },
        data: null,
    });
}