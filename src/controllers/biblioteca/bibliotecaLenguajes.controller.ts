import type { Request, Response } from "express";
import { BibliotecaLenguajesModel } from "../../models/local/biblioteca/bibliotecaLenguajes.model.js";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";

const bibliotecaModel = new BibliotecaLenguajesModel();
export class BibliotecaLenguajesController {
    async ObtenerLenguajes(_req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.getBibliotecaLenguajes();

            res.status(200).json(formatoRespuesta({ ok: true, message: "Lenguajes encontrados", error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async ObtenerUnLenguaje(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.getBibliotecaLenguajesById(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.nombre ?? ""} ha sido encontrado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async crearLenguaje(req: Request, res: Response) {
        try {
            const { data } = await bibliotecaModel.createBibliotecaLenguajes(req.body);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.nombre ?? ""} ha sido creado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async modificarLenguaje(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const campos = req.body;
            const { data } = await bibliotecaModel.updateBibliotecaLenguajes(id, campos);

            const CamposModificados = Object.keys(campos);
            const inicio = CamposModificados.length > 1 ? "Los campos" : "El campo";
            res.status(200).json(formatoRespuesta({ ok: true, message: `${inicio}  ${CamposModificados.length > 0 ? CamposModificados.join(", ") : ""} ha sido actualizada`, error: null, data, }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }

    async eliminarLenguaje(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { data } = await bibliotecaModel.deleteBibliotecaLenguajes(id);

            res.status(200).json(formatoRespuesta({ ok: true, message: `El lenguaje ${data?.nombre ?? ""} ha sido eliminado`, error: null, data }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    }
}