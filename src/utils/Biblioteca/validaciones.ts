import categorias from "../../data/categories.json" with { type: "json" };

export function validarCategorias(categoriasBook: string[]) {
    const categoriasValidas = new Set(categorias.items.map((c) => c.nombre.toLowerCase()));

    const categoriasInvalidas = categoriasBook.filter((c) => !categoriasValidas.has(c.toLowerCase()));

    if (categoriasInvalidas.length > 0) {
        throw new Error(`Categorías no válidas: ${categoriasInvalidas.join(", ")}`);
    }
}