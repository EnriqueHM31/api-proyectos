import type { Request, Response } from "express";
import { extraerDatosError, formatoRespuesta } from "../../utils/index.js";
import { bibliotecaAuthModel } from "../../models/local/biblioteca/bibliotecaAuth.model.js";

export const bibliotecaAuthController = {
    IniciarSesion: async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            const { data, token } = await bibliotecaAuthModel.IniciarSesion({ username, password });

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
            });

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
            const { token } = req.cookies;
            const { data } = await bibliotecaAuthModel.ObtenerUsuario({ token });

            res.status(200).json(formatoRespuesta({ ok: true, message: "Usuario obtenido", data, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },

    CerrarSesion: async (req: Request, res: Response) => {
        try {
            const { token } = req.cookies;
            await bibliotecaAuthModel.CerrarSesion({ token });

            res.clearCookie("token");
            res.status(200).json(formatoRespuesta({ ok: true, message: "Sesión cerrada", data: null, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },

    CambiarContrasena: async (req: Request, res: Response) => {
        try {
            const { newPassword, currentPassword } = req.body;

            const { data } = await bibliotecaAuthModel.CambiarContrasena({ newPassword, currentPassword });

            res.status(200).json(formatoRespuesta({ ok: true, message: "Contraseña cambiada", data, error: null }));
        } catch (error) {
            const { messageError, errorName } = extraerDatosError(error);
            res.status(500).json(formatoRespuesta({ ok: false, message: messageError, error: errorName, data: null }));
        }
    },
};
