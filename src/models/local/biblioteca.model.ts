import dataBiblioteca from "../../data/biblioteca.json" with { type: "json" };
import type { GoogleBook } from "../../types/libro.js";


export class BibliotecaModel {
    async getBiblioteca(): Promise<{ data?: GoogleBook[], error?: { code: number, message: string } }> {
        try {
            const { items } = dataBiblioteca;

            return { data: items };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}