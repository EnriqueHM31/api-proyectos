import { z } from "zod";



const validacionClima = z.object({
    lugar: z
        .string({ message: "El lugar no puede ser un número" })
        .trim()
        .min(1, { message: "El lugar no puede ser vacío" })
        .max(100, { message: "El lugar no puede ser más de 100 caracteres" })
        .refine(v => isNaN(Number(v)), {
            message: "El lugar no puede ser un número",
        }),
    days: z.coerce.number({ message: "Los días deben ser un número" }).min(1, { message: "Los días no pueden ser menores de 1" }).max(10, { message: "Los días no pueden ser más de 10" }),
});

export function validarClimaCampos(data: unknown) {
    return validacionClima.parse(data);
}

export function validarPartialClimaCampos(data: unknown) {
    return validacionClima.safeParse(data);
}
