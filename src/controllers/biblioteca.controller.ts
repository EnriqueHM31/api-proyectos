import type { Request, Response } from "express";
import { BibliotecaModel } from "../models/local/biblioteca.model.js";
import { formatoRespuesta } from "../utils/index.js";


const bibliotecaModel = new BibliotecaModel();

export class BibliotecaController {
    async getAll(req: Request, res: Response) {

        try {
            const { data } = await bibliotecaModel.getBiblioteca();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }

    }
}