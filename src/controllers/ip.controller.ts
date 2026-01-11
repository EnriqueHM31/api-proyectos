import type { Request, Response } from "express";
import { isIP } from "node:net";

export class IpController {
    constructor(private readonly urlGeolocalizacion: string) { }

    public getIp = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { ip } = req.params;

            // 1️⃣ Validar existencia
            if (!ip) {
                return res.status(400).json({
                    message: "La IP es requerida"
                });
            }

            // 2️⃣ Validar formato
            if (isIP(ip as string) === 0) {
                return res.status(400).json({
                    message: "IP inválida"
                });
            }

            const url = `${this.urlGeolocalizacion}&ip=${encodeURIComponent(ip as string)}`;

            // 3️⃣ Llamada a API externa con timeout
            const response = await fetch(url, {
                signal: AbortSignal.timeout(5000)
            });

            // 4️⃣ Manejo de error HTTP
            if (!response.ok) {
                const data = (await response.json()) as { message: string };
                return res.status(response.status).json({
                    message: data.message
                });
            }

            const data = await response.json();

            // 5️⃣ Respuesta exitosa
            return res.status(200).json(data);

        } catch (error) {
            console.error("IpController.getIp:", error);

            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    };
}
