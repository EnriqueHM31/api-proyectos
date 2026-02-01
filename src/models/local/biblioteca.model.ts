import { randomUUID } from "node:crypto";
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
    async getBibliotecaById(id: string): Promise<{ data?: GoogleBook, error?: { code: number, message: string } }> {
        try {
            const { items } = dataBiblioteca;
            const data = items.find((item) => item.id === id);

            if (!data) throw new Error("No se encontró el libro");
            return { data };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async createBiblioteca(data: GoogleBook): Promise<{ data?: GoogleBook, error?: { code: number, message: string } }> {
        try {
            const { items } = dataBiblioteca;
            const newItem = { ...data, id: randomUUID() };

            items.push(newItem);

            return { data: newItem };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async updateBiblioteca(id: string, data: GoogleBook): Promise<{ data?: GoogleBook, error?: { code: number, message: string } }> {
        try {
            const { items } = dataBiblioteca;
            const index = items.findIndex((item) => item.id === id);
            const newItem = { ...data, id };

            items[index] = newItem;

            return { data: newItem };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async deleteBiblioteca(id: string): Promise<{ data?: GoogleBook, error?: { code: number, message: string } }> {
        try {
            const { items } = dataBiblioteca;
            const index = items.findIndex((item) => item.id === id);

            items.splice(index, 1);



            return { data: items[index] as GoogleBook };
        } catch (error) {
            throw new Error(error as string);
        }
    }
}