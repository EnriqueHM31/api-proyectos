import type { Request, Response } from "express";
import { formatoRespuesta } from "../../utils/index.js";
import { BibliotecaBooksModel } from "../../models/local/biblioteca/bibliotecaBooks.model.js";

const bibliotecaModel = new BibliotecaBooksModel();

export class BibliotecaBooksController {
    async getAll(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.getBibliotecaBooks();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Libros Obtenidos", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Libros Obtenidos", error: error as string, data: null }));
        }
    }

    async getBook(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.getBibliotecaBooksById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Libros Obtenidos", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Libros Obtenidos", error: error as string, data: null }));
        }
    }

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { data } = await bibliotecaModel.createBibliotecaBooks(req.body);

            console.log(data);
            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Libros Obtenidos", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Libros Obtenidos", error: error as string, data: null }));
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;
            const { data } = await bibliotecaModel.updateBibliotecaBooks(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Libros Obtenidos", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Libros Obtenidos", error: error as string, data: null }));
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.deleteBibliotecaBooks(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Libros Obtenidos", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Libros Obtenidos", error: error as string, data: null }));
        }
    }
}
