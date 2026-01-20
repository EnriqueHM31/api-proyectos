import type { Request, Response } from "express";
import { Resend } from "resend";
import { API_KEY_EMAIL } from "../constants/index.js";

const resend = new Resend(API_KEY_EMAIL);


export class EmailController {
    sendEmailController = async (req: Request, res: Response) => {
        try {
            const { email, comentario, page } = req.body;

            console.log(req.body);
            // ✅ Validaciones básicas
            if (!email || !comentario || !page) {
                return res.status(400).json({
                    ok: false,
                    message: "to, subject y html son obligatorios",
                });
            }

            const html = `
                <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>HM Projects</title>
  </head>

  <body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          
          <!-- CARD -->
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#020617; border-radius:16px; overflow:hidden; border:1px solid #1e293b;">
            
            <!-- HEADER -->
            <tr>
              <td style="padding:32px; text-align:center; background:linear-gradient(135deg,#0ea5e9,#2563eb);">
                <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                  HM Projects
                </h1>
                <p style="margin:8px 0 0; color:#e0f2fe; font-size:14px;">
                  Nuevo mensaje recibido
                </p>
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:32px; color:#e5e7eb;">
                
                <p style="margin:0 0 12px; font-size:14px; color:#94a3b8;">
                  Página de origen
                </p>

                <p style="margin:0 0 24px; font-size:16px; font-weight:bold; color:#38bdf8;">
                  ${page}
                </p>

                <p style="margin:0 0 8px; font-size:14px; color:#94a3b8;">
                  Comentario
                </p>

                <div style="padding:16px; background:#020617; border:1px solid #1e293b; border-radius:12px; margin-bottom:24px;">
                  <p style="margin:0; font-size:15px; line-height:1.6;">
                    ${comentario}
                  </p>
                </div>

                <p style="margin:0 0 8px; font-size:14px; color:#94a3b8;">
                  Enviado por
                </p>

                <p style="margin:0; font-size:16px; font-weight:bold;">
                  ${email}
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:24px; text-align:center; background:#020617; border-top:1px solid #1e293b;">
                <p style="margin:0; font-size:12px; color:#64748b;">
                  © {{year}} HM Projects
                </p>
                <p style="margin:4px 0 0; font-size:12px; color:#475569;">
                  Este correo fue enviado automáticamente desde tu sitio web
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>

            `;

            const data = await resend.emails.send({
                from: process.env.RESEND_FROM || "onboarding@resend.dev",
                to: "luisenriquehernandezmarin0@gmail.com",
                subject: `Mensaje desde la pagina ${page}`,
                html,
            });

            return res.status(200).json({
                ok: true,
                message: "Correo enviado correctamente",
                data,
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