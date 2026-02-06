import { z } from "zod";

/* =========================
   BASE
========================= */

const bibliotecaLibrosSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),

    volumeInfo: z.object(
        {
            title: z.string({ message: "El título es requerido" }).min(1),
            subtitle: z.string({ message: "El subtitulo es requerido" }).min(1, { message: "El subtitulo es requerido" }),
            authors: z.array(z.string({ message: "Los autores estan mal formateados" })).min(1, { message: "Los autores estan mal formateados" }),
            publisher: z.string({ message: "El editor es requerido" }).min(1, { message: "El editor es requerido" }),
            publishedDate: z.string({ message: "La fecha de publicación es requerida" }).min(1, { message: "La fecha de publicación es requerida" }),
            description: z.string({ message: "La descripción es requerida" }).min(1, { message: "La descripción es requerida" }),
            pageCount: z.number({ message: "El numero de paginas es requerido" }).min(1, { message: "El numero de paginas es requerido" }),
            categories: z.array(z.string({ message: "Las categorias estan mal formateadas" })).min(1, { message: "Las categorias estan mal formateadas" }),
            imageLinks: z.object({
                thumbnail: z.string({ message: "El link de la imagen es requerido" }).min(1, { message: "El link de la imagen es requerido" }),
            }),
            language: z.string({ message: "El idioma es requerido" }).min(1, { message: "El idioma es requerido" }),
        },
        { message: "Los datos del libro son requeridos" }
    ),
});

/* =========================
   CREATE
   ➜ NO recibe id
========================= */

const bibliotecaLibrosCreateSchema = bibliotecaLibrosSchema.omit({
    id: true,
});

export function validarBibliotecaLibrosCrear(data: unknown) {
    return bibliotecaLibrosCreateSchema.parse(data);
}

/* =========================
   Modificar
   ➜ parcial pero NO vacío
========================= */

const bibliotecaLibrosModificarSchema = bibliotecaLibrosSchema
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });

export function validarBibliotecaLibrosModificar(data: unknown) {
    return bibliotecaLibrosModificarSchema.safeParse(data);
}

/* =========================
   ID PARAM
========================= */

const bibliotecaLibrosIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaLibrosId(data: unknown) {
    return bibliotecaLibrosIdSchema.safeParse(data);
}
