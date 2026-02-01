// libro.d.ts

/* =========================
   RESPUESTA GENERAL API
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
    subtitle: string;

    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;

    pageCount: number;
    categories: string[];

    imageLinks: ImageLinks;

    language: string;
}

/* =========================
   IMÁGENES
========================= */

export interface ImageLinks {
    thumbnail: string;
}
