// libro.d.ts

/* =========================
   RESPUESTA GENERAL API
========================= */

export interface GoogleBooksResponse {
    kind: string;
    totalItems: number;
    items?: GoogleBook[];
}

/* =========================
   LIBRO
========================= */

export interface GoogleBook {
    id: string;

    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}

/* =========================
   VOLUME INFO
========================= */

export interface VolumeInfo {
    title: string;
    subtitle?: string;

    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;

    industryIdentifiers?: IndustryIdentifier[];

    pageCount?: number;
    printType?: "BOOK" | "MAGAZINE";
    categories?: string[];
    maturityRating?: string;
    language?: string;

    imageLinks?: ImageLinks;

    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;
}

/* =========================
   IMÁGENES
========================= */

export interface ImageLinks {
    smallThumbnail?: string;
    thumbnail?: string;
}

/* =========================
   IDENTIFICADORES (ISBN)
========================= */

export interface IndustryIdentifier {
    type: "ISBN_10" | "ISBN_13" | string;
    identifier: string;
}

/* =========================
   SALE INFO
========================= */

export interface SaleInfo {
    country: string;
    saleability: "FOR_SALE" | "NOT_FOR_SALE" | "FREE";
    isEbook: boolean;

    listPrice?: Price;
    retailPrice?: Price;

    buyLink?: string;
    offers?: Offer[];
}

export interface Price {
    amount: number;
    currencyCode: string;
}

/* =========================
   OFERTAS
========================= */

export interface Offer {
    finskyOfferType: number;
    listPrice: PriceMicros;
    retailPrice: PriceMicros;
    giftable: boolean;
}

export interface PriceMicros {
    amountInMicros: number;
    currencyCode: string;
}

/* =========================
   ACCESS INFO
========================= */

export interface AccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission?: string;

    epub?: FormatAvailability;
    pdf?: FormatAvailability;

    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed?: boolean;
}

export interface FormatAvailability {
    isAvailable: boolean;
    acsTokenLink?: string;
}

/* =========================
   SEARCH INFO
========================= */

export interface SearchInfo {
    textSnippet: string;
}
