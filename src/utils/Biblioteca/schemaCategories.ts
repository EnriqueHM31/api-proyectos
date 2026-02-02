import { z } from "zod";

const bibliotecaCategories = z.object({
    id: z.string({ message: "El id es requerido" }).min(1, { message: "El id no puede ser vacío" }).uuid({ message: "El id debe ser un UUID válido" }),
    nombre: z.string({ message: "El nombre es requerido" }).min(1, { message: "El nombre no puede ser vacío" }),
    descripcion: z.string({ message: "La descripción es requerida" }).min(1, { message: "La descripción no puede ser vacío" }),
});

export function validarBibliotecaCategoriesCampos(data: unknown) {
    return bibliotecaCategories.parse(data);
}

export function validarPartialBibliotecaCategoriesCampos(data: unknown) {
    return bibliotecaCategories.partial().safeParse(data);
}