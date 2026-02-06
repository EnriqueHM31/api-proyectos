import { z } from "zod";



const bibliotecaLenguajesSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),

    nombre: z.string({ message: "El nombre es requerido" }).min(1, { message: "El nombre no puede ser vacío" }),

    abreviacion: z.string({ message: "La abreviación es requerida" }).min(1, { message: "La abreviación no puede ser vacía" }),
});

const bibliotecaLenguajesCreateSchema = bibliotecaLenguajesSchema.omit({
    id: true,
});

export function validarBibliotecaLenguajesCreate(data: unknown) {
    return bibliotecaLenguajesCreateSchema.parse(data);
}

const bibliotecaLenguajesUpdateSchema = bibliotecaLenguajesSchema
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });

export function validarBibliotecaLenguajesUpdate(data: unknown) {
    return bibliotecaLenguajesUpdateSchema.safeParse(data);
}

const bibliotecaLenguajesIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaLenguajesId(data: unknown) {
    return bibliotecaLenguajesIdSchema.safeParse(data);
}
