import type { Request, Response } from "express";
export class ClimaController {
    constructor(private readonly urlClima: string) { }

    getClima = async (req: Request, res: Response) => {
        try {
            const { lugar } = req.params;
            const { days } = req.query;

            // 1️⃣ Validar existencia
            if (!lugar) {
                res.status(400).json({
                    error: {
                        code: 1003,
                        message: "Lugar requerido"
                    }
                });
                throw new Error("Lugar requerido");
            }


            const url = `${this.urlClima}&q=${encodeURIComponent(lugar as string)}&days=${days}`;

            // 3️⃣ Llamada a API externa
            const response = await fetch(url);

            // 4️⃣ Manejo de error HTTP
            if (!response.ok) {
                const data = await response.json() as { error?: { code: number, message: string } };
                res.status(response.status).json({
                    error: {
                        code: data.error?.code,
                        message: data.error?.message
                    }
                });
                throw new Error("Error API externa");
            }

            // 5️⃣ Parseo seguro
            const data = await response.json();

            res.status(200).json(data);

        } catch (error) {

            // Evita responder dos veces
            if (!res.headersSent) {
                res.status(500).json({
                    error: "Error interno del servidor"
                });
            }
        }

    }
}