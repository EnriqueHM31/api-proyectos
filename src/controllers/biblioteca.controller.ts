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

    async getBook(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.getBibliotecaById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.createBiblioteca(req.body);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body
            const { data } = await bibliotecaModel.updateBiblioteca(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.deleteBiblioteca(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }
}