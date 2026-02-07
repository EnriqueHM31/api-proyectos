import type { Request, Response } from "express";
import { BibliotecaLibrosModel } from "../../models/local/biblioteca/bibliotecaLibros.model.js";
import type { GoogleBook } from "../../types/libro.js";
import { validarCategorias, validarLenguaje } from "../../utils/Biblioteca/validaciones.js";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";

const bibliotecaLibrosModel = new BibliotecaLibrosModel();

export class BibliotecaLibrosController {
    async ObtenerLibros(_req: Request, res: Response) {
        try {
            const { data } = await bibliotecaLibrosModel.ObtenerBibliotecaLibros();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Libros encontrados", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al obtener los libros", error: error as string, data: null }));
        }
    }

    async ObtenerUnLibro(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaLibrosModel.ObtenerBibliotecaLibrosById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido encontrado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);

            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async crearLibro(req: Request, res: Response) {
        try {
            const dataBody = req.body as GoogleBook;

            validarCategorias(dataBody.volumeInfo.categories);
            validarLenguaje(dataBody.volumeInfo.language);

            const { data } = await bibliotecaLibrosModel.crearBibliotecaLibros(dataBody);

            res.status(200).json(
                formatoRespuesta({
                    ok: true,
                    message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido creado`,
                    error: null,
                    data,
                })
            );
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

    async modificarLibro(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;

            if (campos?.categories) {
                validarCategorias(campos.categories);
            }

            const { data } = await bibliotecaLibrosModel.modificarBibliotecaLibros(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido actualizado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);

            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async eliminarLibro(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaLibrosModel.eliminarBibliotecaLibros(id);

            res.status(200).json(
                formatoRespuesta({ ok: true, message: `El libro ${data?.volumeInfo?.title ?? ""} ha sido eliminado`, error: null, data: data })
            );
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);

            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }
}
