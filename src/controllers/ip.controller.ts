import type { Request, Response } from "express";
import { isIP } from "node:net";

export class IpController {
    constructor(private readonly urlGeolocalizacion: string) { }

    getIp = async (req: Request, res: Response) => {
        try {
            const { ip } = req.params;

            // 1️⃣ Validar existencia
            if (!ip) {
                res.status(400).json({ message: "La IP es requerida" });
                throw new Error("IP requerida");
            }

            // 2️⃣ Validar formato
            if (isIP(ip as string) === 0) {
                res.status(400).json({ message: "IP inválida" });
                throw new Error("IP inválida");
            }

            const url = `${this.urlGeolocalizacion}&ip=${encodeURIComponent(ip as string)}`;

            // 3️⃣ Llamada a API externa
            const response = await fetch(url);

            // 4️⃣ Manejo de error HTTP
            if (!response.ok) {
                const data = await response.json() as { message?: string };

                res.status(response.status).json({
                    message: data.message ?? "Error en el servicio de geolocalización"
                });

                throw new Error("Error API externa");
            }

            // 5️⃣ Parseo seguro
            const data = await response.json();
            console.log({ data });

            res.status(200).json(data);

        } catch (error) {
            console.error("IpController.getIp:", error);

            // Evita responder dos veces
            if (!res.headersSent) {
                res.status(500).json({
                    error: "Error interno del servidor"
                });
            }
        }
    };
}
