import { formatoRespuesta } from "../../utils/index.js";
import type { Request, Response } from "express";
import { BibliotecaCategoriasModel } from "../../models/local/biblioteca/bibliotecaCategorias.model.js";

const bibliotecaCategoriasModel = new BibliotecaCategoriasModel();
export class BibliotecaCategoriasController {
    async obtenerCategorias(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaCategoriasModel.obtenerBibliotecaCategorias();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Biblioteca Categorias Obtenidas", error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Biblioteca Categorias Obtenidas", error: error as string, data: null }));
        }
    }

    async ObtenerUnaCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaCategoriasModel.ObtenerUnaBibliotecaCategoriasById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `La categoría ${data?.nombre ?? ""} ha sido encontrada`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: `Ocurrio un error al obtener la categoría`, error: error as string, data: null }));
        }
    }

    async crearCategoria(req: Request, res: Response) {
        try {
            console.log(req.body);
            const { data } = await bibliotecaCategoriasModel.crearBibliotecaCategorias(req.body);

            console.log(data);
            res.status(200).json(formatoRespuesta({ ok: true, message: `La categoría ${data?.nombre ?? ""} ha sido creada`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al crear la categoría", error: error as string, data: null }));
        }
    }

    async modificarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;

            const { data } = await bibliotecaCategoriasModel.modificarBibliotecaCategorias(id, campos);

            const CamposModificados = Object.keys(campos);
            const inicio = CamposModificados.length > 1 ? "Los campos" : "El campo";
            res.status(200).json(
                formatoRespuesta({
                    ok: true,
                    message: `${inicio}  ${CamposModificados.length > 0 ? CamposModificados.join(", ") : ""} ha sido actualizada`,
                    error: null,
                    data,
                })
            );
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al actualizar la categoría", error: error as string, data: null }));
        }
    }

    async eliminarCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaCategoriasModel.eliminarBibliotecaCategorias(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `${`La categoría ${data?.nombre ?? ""} ha sido eliminada`}`, error: null, data }));
        } catch (error) {
            res.status(500).json(formatoRespuesta({ ok: false, message: "Ocurrio un error al eliminar la categoría", error: error as string, data: null }));
        }
    }
}
