import { z } from "zod";

const bibliotecaBook = z.object({
    id: z.string(),
    volumeInfo: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        publisher: z.string(),
        publishedDate: z.string(),
        description: z.string(),
        pageCount: z.number(),
        categories: z.array(z.string()),
        imageLinks: z.object({
            smallThumbnail: z.string(),
            thumbnail: z.string(),
        }),
        language: z.string(),
        previewLink: z.string(),
        infoLink: z.string(),
        canonicalVolumeLink: z.string(),
    }),
});

export function validarBibliotecaCampos(data: unknown) {
    return bibliotecaBook.parse(data);
}

export function validarPartialBibliotecaCampos(data: unknown) {
    return bibliotecaBook.safeParse(data);
}