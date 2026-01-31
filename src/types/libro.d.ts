// libro.d.ts

/* =========================
   RESPUESTA GENERAL API (NORMALIZADA)
========================= */

export interface GoogleBooksResponse {
    items: GoogleBook[];
}

/* =========================
   LIBRO
========================= */

export interface GoogleBook {
    id: string;
    volumeInfo: VolumeInfo;
}

/* =========================
   VOLUME INFO
========================= */

export interface VolumeInfo {
    title: string;

    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;

    pageCount: number;
    categories: string[];

    imageLinks: ImageLinks;

    language: string;

    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

/* =========================
   IMÁGENES
========================= */

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}
