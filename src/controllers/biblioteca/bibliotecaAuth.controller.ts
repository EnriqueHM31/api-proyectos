import type { Request, Response } from "express";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";
import { bibliotecaAuthModel } from "../../models/local/biblioteca/bibliotecaAuth.model.js";

export const bibliotecaAuthController = {
    IniciarSesion: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const { data, token } = await bibliotecaAuthModel.IniciarSesion({ username, password });

            console.log({ token });

            res.cookie("token", token, { httpOnly: true, secure: true });
            res.status(200).json(formatoRespuesta({ ok: true, message: "Sesión iniciada", data, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },

    RegistrarUsuario: async (req: Request, res: Response) => {
        try {
            const { username, password, correo } = req.body;

            const data = await bibliotecaAuthModel.RegistrarUsuario({ username, password, correo });

            res.status(200).json(formatoRespuesta({ ok: true, message: "Usuario registrado", data, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },

    ObtenerUsuario: async (req: Request, res: Response) => {
        try {

            const token = req.cookies.token;
            if (!token) {
                res.status(401).json(formatoRespuesta({ ok: false, message: "No se ha iniciado sesión", data: null, error: null }));
            }
            const data = await bibliotecaAuthModel.ObtenerUsuario({ token });

            res.status(200).json(formatoRespuesta({ ok: true, message: "Usuario obtenido", data, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },

    CerrarSesion: async (req: Request, res: Response) => {
        try {
            const { token } = req.cookies;

            if (!token) {
                res.status(401).json(formatoRespuesta({ ok: false, message: "No se ha iniciado sesión", data: null, error: null }));
            }
            await bibliotecaAuthModel.CerrarSesion({ token });

            res.clearCookie("token");
            res.status(200).json(formatoRespuesta({ ok: true, message: "Sesión cerrada", data: null, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },
};
