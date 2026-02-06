import { z } from "zod";



const bibliotecaLenguajesSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),

    nombre: z.string({ message: "El nombre es requerido" }).min(1, { message: "El nombre no puede ser vacío" }),

    abreviacion: z.string({ message: "La abreviación es requerida" }).min(1, { message: "La abreviación no puede ser vacía" }),
});

const bibliotecaLenguajesCreareSchema = bibliotecaLenguajesSchema.omit({
    id: true,
});

export function validarBibliotecaLenguajesCrear(data: unknown) {
    return bibliotecaLenguajesCreareSchema.parse(data);
}

const bibliotecaLenguajesModificarSchema = bibliotecaLenguajesSchema
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });

export function validarBibliotecaLenguajesModificar(data: unknown) {
    return bibliotecaLenguajesModificarSchema.safeParse(data);
}

const bibliotecaLenguajesIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaLenguajesId(data: unknown) {
    return bibliotecaLenguajesIdSchema.safeParse(data);
}
