import { z } from "zod";

export const EmailSchema = z.object({
    email: z.string().min(1).max(255).includes("@").regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
    comentario: z.string().min(1).max(500),
    page: z.string().min(1).max(100),
});


export function validarEmail(data: unknown) {
    return EmailSchema.safeParse(data);
}

export function validarPartialEmailCampos(data: unknown) {
    return EmailSchema.safeParse(data);
}