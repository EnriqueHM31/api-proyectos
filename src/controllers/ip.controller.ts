import type { Response, Request } from "express";

export const ipController = {
    getIp: async (req: Request, res: Response) => {
        const ip = req.params.ip;
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=f4c3d1b9c1c4f2&ip=${ip}`);
        const data = await response.json();

        res.json(data);
    }
};