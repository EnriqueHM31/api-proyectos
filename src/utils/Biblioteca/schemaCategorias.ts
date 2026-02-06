import { z } from "zod";

/* =========================
   ESQUEMA BASE
========================= */

const bibliotecaCategoriasSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),

    nombre: z.string({ message: "El nombre es requerido" }).min(1, { message: "El nombre no puede ser vacío" }),

    descripcion: z.string({ message: "La descripción es requerida" }).min(1, { message: "La descripción no puede ser vacía" }),
});

const bibliotecaCategoriasCreateSchema = bibliotecaCategoriasSchema.omit({
    id: true,
});

export function validarBibliotecaCategoriasCreate(data: unknown) {
    return bibliotecaCategoriasCreateSchema.parse(data);
}

const bibliotecaCategoriasUpdateSchema = bibliotecaCategoriasSchema
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });

export function validarBibliotecaCategoriasUpdate(data: unknown) {
    return bibliotecaCategoriasUpdateSchema.safeParse(data);
}

const bibliotecaCategoriasIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaCategoriasId(data: unknown) {
    return bibliotecaCategoriasIdSchema.safeParse(data);
}
