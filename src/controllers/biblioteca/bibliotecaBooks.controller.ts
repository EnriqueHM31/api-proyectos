import type { Request, Response } from "express";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";
import { BibliotecaBooksModel } from "../../models/local/biblioteca/bibliotecaBooks.model.js";

const bibliotecaModel = new BibliotecaBooksModel();

export class BibliotecaBooksController {
    async getAll(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.getBibliotecaBooks();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Libros encontrados", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al obtener los libros", error: error as string, data: null }));
        }
    }

    async getBook(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.getBibliotecaBooksById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido encontrado`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al obtener el libro", error: error as string, data: null }));
        }
    }

    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { data } = await bibliotecaModel.createBibliotecaBooks(req.body);

            console.log(data);
            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido creado`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al crear el libro", error: error as string, data: null }));
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;
            const { data } = await bibliotecaModel.updateBibliotecaBooks(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido actualizado`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al actualizar el libro", error: error as string, data: null }));
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.deleteBibliotecaBooks(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido eliminado`, error: null, data: data }));
        } catch (error) {

            const { messageError, errorName } = extraerDatosError(error);

            res.status(500).json(
                formatoRespuesta({
                    ok: false,
                    message: messageError,
                    error: errorName,
                    data: null,
                })
            );
        }

    }
}
