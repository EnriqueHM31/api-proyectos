import type { Request, Response } from "express";
import { EmailModel } from "../models/local/email.model.js";
import { construirEmail } from "../utils/Email/index.js";
import { validarString } from "../utils/Clima/index.js";

const emailModel = new EmailModel();

export class EmailController {
  sendEmailController = async (req: Request, res: Response) => {
    try {
      const { email: emailRecibido, comentario: comentarioRecibido, page: paginaRecibida } = req.body;

      // ✅ Validaciones básicas
      const email = validarString(emailRecibido);

      const comentario = validarString(comentarioRecibido);

      const page = validarString(paginaRecibida);


      const html = construirEmail({ page, comentario, email });
      const paginaDondeFueMandado = `Mensaje desde la pagina ${page}`

      await emailModel.mandarEmail({ html, paginaDondeFueMandado });

      return res.status(200).json({
        ok: true,
        message: "Correo enviado correctamente",
      });

    } catch (error: any) {
      console.error("Error enviando correo:", error);

      return res.status(500).json({
        ok: false,
        message: "Error al enviar el correo",
        error: error.message,
      });
    }
  };
}