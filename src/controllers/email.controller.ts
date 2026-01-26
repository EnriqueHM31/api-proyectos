import type { Request, Response } from "express";
import { EmailModel } from "../models/local/email.model.js";
import { construirEmail } from "../utils/Email/index.js";
import { formatoRespuesta } from "../utils/index.js";

const emailModel = new EmailModel();

export class EmailController {
  sendEmailController = async (req: Request, res: Response) => {
    try {
      const { email, comentario, page } = req.body;

      const html = construirEmail({ page, comentario, email });
      const paginaDondeFueMandado = `Mensaje desde la pagina ${page}`

      await emailModel.mandarEmail({ html, paginaDondeFueMandado });

      const response = formatoRespuesta({ ok: true, message: "Correo enviado correctamente", error: null, data: null });
      res.status(200).json(response);

    } catch (error: any) {
      console.error("Error enviando correo:", error);

      const response = formatoRespuesta({ ok: false, message: "Error al enviar el correo", error: error.message, data: null });
      res.status(500).json(response);
    }
  };
}