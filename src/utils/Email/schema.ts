import { z } from "zod";

export const EmailSchema = z.object({
    email: z.string({ message: "El email debe ser una cadena de caracteres" })
        .min(1, { message: "El email no puede ser menor de 1 caracter" })
        .max(255, { message: "El email no puede ser más de 255 caracteres" })
        .includes("@", { message: "El email debe contener un @" })
        .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, { message: "El email no es válido" }),
    comentario: z.string({ message: "El comentario debe ser una cadena de caracteres" }).
        min(1, { message: "El comentario no puede ser menor de 1 caracter" })
        .max(500, { message: "El comentario no puede ser más de 500 caracteres" }),
    page: z.string({ message: "La página debe ser una cadena de caracteres" })
        .min(1, { message: "La página no puede ser menor de 1 caracter" })
        .max(100, { message: "La página no puede ser más de 100 caracteres" }),
});


export function validarEmail(data: unknown) {
    return EmailSchema.safeParse(data);
}

export function validarPartialEmailCampos(data: unknown) {
    return EmailSchema.safeParse(data);
}