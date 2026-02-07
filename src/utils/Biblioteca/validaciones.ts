import categorias from "../../data/biblioteca/categorias.json" with { type: "json" };
import lenguajes from "../../data/biblioteca/lenguajes.json" with { type: "json" };

export function validarCategorias(categoriasBook: string[]) {
    if (!categoriasBook || categoriasBook.length === 0) {
        throw new Error("No se encontraron categorías");
    }
    const categoriasValidas = new Set(categorias.items.map((c) => c.nombre.toLowerCase()));

    const categoriasInvalidas = categoriasBook.filter((c) => !categoriasValidas.has(c.toLowerCase()));

    if (categoriasInvalidas.length > 0) {
        throw new Error(`Categorías no válidas: ${categoriasInvalidas.join(", ")}`);
    }
}

export function validarLenguaje(language: string) {
    if (!language) {
        throw new Error("El lenguaje es requerido");
    }

    // normalizamos
    const lang = language.toLowerCase().trim();

    // validar formato 2 letras
    if (!/^[a-z]{2}$/.test(lang)) {
        throw new Error("El lenguaje debe ser un código ISO de 2 letras (ej: es, en, fr)");
    }

    // obtener lista válida
    const lenguajesValidos = new Set(
        lenguajes.items.map((l) => l.abreviacion.toLowerCase())
    );

    if (!lenguajesValidos.has(lang)) {
        throw new Error(`Lenguaje no válido: ${lang}`);
    }

    return lang;
}