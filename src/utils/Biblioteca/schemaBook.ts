import { z } from "zod";

const bibliotecaBook = z.object({
    id: z.string({ message: "El id es requerido" }).min(1, { message: "El id no puede ser vacío" }).uuid({ message: "El id debe ser un UUID válido" }),
    volumeInfo: z.object({
        title: z.string({ message: "El título es requerido" }).min(1, { message: "El título no puede ser vacío" }),
        subtitle: z.string({ message: "El subtítulo es requerido" }).min(1, { message: "El subtítulo no puede ser vacío" }),
        authors: z.array(z.string({ message: "Los autores deben ser cadenas de caracteres" }), { message: "Los autores estan mal formados" }),
        publisher: z.string({ message: "El publisher es requerido" }).min(1, { message: "El publisher no puede ser vacío" }),
        publishedDate: z.string({ message: "La fecha de publicación es requerida" }).min(1, { message: "La fecha de publicación no puede ser vacío" }),
        description: z.string({ message: "La descripción es requerida" }).min(1, { message: "La descripción no puede ser vacío" }),
        pageCount: z.number({ message: "El número de páginas es requerido" }),
        categories: z.array(z.string({ message: "Las categorías son requeridas" }), { message: "Las categorías estan mal formadas" }),
        imageLinks: z.object({
            thumbnail: z
                .string({ message: "La imagen es requerida" })
                .min(1, { message: "La imagen no puede ser vacío" })
                .url({ message: "La imagen no es una URL válida" }),
        }),
        language: z.string({ message: "El idioma es requerido" }).min(1, { message: "El idioma no puede ser vacío" }),
    }),
});

export function validarBibliotecaBooksCampos(data: unknown) {
    return bibliotecaBook.parse(data);
}

export function validarPartialBibliotecaBooksCampos(data: unknown) {
    return bibliotecaBook.partial().safeParse(data);
}
