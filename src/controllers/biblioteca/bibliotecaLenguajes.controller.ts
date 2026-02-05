import type { Request, Response } from "express";
import { BibliotecaLenguajesModel } from "../../models/local/biblioteca/bibliotecaLenguajes.model.js";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";

const bibliotecaModel = new BibliotecaLenguajesModel();
export class BibliotecaLenguajesController {
    async getAll(_req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.getBibliotecaLenguajes();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Lenguajes encontrados", error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async getLenguaje(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.getBibliotecaLenguajesById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.Nombre ?? ""} ha sido encontrado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.createBibliotecaLenguajes(req.body);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.Nombre ?? ""} ha sido creado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;
            const { data } = await bibliotecaModel.updateBibliotecaLenguajes(id, campos);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.Nombre ?? ""} ha sido actualizado`, error: null, data }));
        } catch (error) {

            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.deleteBibliotecaLenguajes(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.Nombre ?? ""} ha sido eliminado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }
}