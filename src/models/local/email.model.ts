import { Resend } from "resend";
import type { CreateEmailResponse } from "resend";

const resend = new Resend(process.env.API_KEY_EMAIL ?? "");

export class EmailModel {
    mandarEmail = async ({ paginaDondeFueMandado, html }: { paginaDondeFueMandado: string, html: string }) => {

        const response: CreateEmailResponse = await resend.emails.send({
            from: process.env.RESEND_FROM || "onboarding@resend.dev",
            to: "luisenriquehernandezmarin0@gmail.com",
            subject: `Mensaje desde la pagina ${paginaDondeFueMandado}`,
            html,
        });

        if (response.error) {
            throw new Error("Error al enviar el correo");
        }

        return response;
    }
}