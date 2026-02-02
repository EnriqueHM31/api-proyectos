import { z } from "zod";

/* =========================
   ESQUEMA BASE
========================= */

const bibliotecaCategoriesSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),

    nombre: z.string({ message: "El nombre es requerido" }).min(1, { message: "El nombre no puede ser vacío" }),

    descripcion: z.string({ message: "La descripción es requerida" }).min(1, { message: "La descripción no puede ser vacía" }),
});

const bibliotecaCategoriesCreateSchema = bibliotecaCategoriesSchema.omit({
    id: true,
});

export function validarBibliotecaCategoriesCreate(data: unknown) {
    return bibliotecaCategoriesCreateSchema.parse(data);
}

const bibliotecaCategoriesUpdateSchema = bibliotecaCategoriesSchema
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });

export function validarBibliotecaCategoriesUpdate(data: unknown) {
    return bibliotecaCategoriesUpdateSchema.safeParse(data);
}

const bibliotecaCategoriesIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaCategoriesId(data: unknown) {
    return bibliotecaCategoriesIdSchema.safeParse(data);
}
