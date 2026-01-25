import { z } from "zod";



const validacionClima = z.object({
    lugar: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .refine(v => isNaN(Number(v)), {
            message: "El lugar no puede ser un número",
        }),
    days: z.coerce.number().min(1).max(10),
});

export function validarClimaCampos(data: unknown) {
    return validacionClima.parse(data);
}

export function validarPartialClimaCampos(data: unknown) {
    return validacionClima.safeParse(data);
}
