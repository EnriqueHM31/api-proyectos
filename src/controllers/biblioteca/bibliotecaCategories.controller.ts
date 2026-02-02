import { formatoRespuesta } from "../../utils/index.js";
import type { Request, Response } from "express";
import { BibliotecaCategoriesModel } from "../../models/local/biblioteca/bibliotecaCategories.model.js";


const bibliotecaCategoriesModel = new BibliotecaCategoriesModel();
export class BibliotecaCategoriesController {
    async getAll(req: Request, res: Response) {

        try {
            const { data } = await bibliotecaCategoriesModel.getBiblioteca();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }

    }

    async getCategories(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaCategoriesModel.getBibliotecaById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { data } = await bibliotecaCategoriesModel.createBiblioteca(req.body);


            console.log(data);
            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body
            const { data } = await bibliotecaCategoriesModel.updateBiblioteca(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaCategoriesModel.deleteBiblioteca(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca", error: error as string, data: null }));
        }
    }
}