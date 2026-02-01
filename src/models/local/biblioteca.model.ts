import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import dataBiblioteca from "../../data/biblioteca.json" with { type: "json" };
import type { GoogleBook } from "../../types/libro.js";
const filePath = path.resolve("src/data/biblioteca.json");

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
    async createBiblioteca(
        data: GoogleBook
    ): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            // 1️⃣ Leer archivo JSON
            const file = await fs.readFile(filePath, "utf-8");
            const dataBiblioteca = JSON.parse(file);

            // 2️⃣ Crear nuevo item
            const newItem: GoogleBook & { id: string } = {
                ...data,
                id: randomUUID(),
            };

            // 3️⃣ Validar estructura
            if (!Array.isArray(dataBiblioteca.items)) {
                dataBiblioteca.items = [];
            }

            // 4️⃣ Agregar
            dataBiblioteca.items.push(newItem);

            // 5️⃣ Guardar cambios
            await fs.writeFile(
                filePath,
                JSON.stringify(dataBiblioteca, null, 2),
                "utf-8"
            );

            return { data: newItem };
        } catch (error) {
            return {
                error: {
                    code: 500,
                    message: "Error al crear el registro en la biblioteca",
                },
            };
        }
    }
    async updateBiblioteca(
        id: string,
        data: Partial<GoogleBook>
    ): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            const { items } = dataBiblioteca;

            const index = items.findIndex(item => item.id === id);

            if (index === -1) {
                return {
                    error: {
                        code: 404,
                        message: "Libro no encontrado"
                    }
                };
            }

            const currentItem = items[index];

            if (!currentItem) {
                return {
                    error: {
                        code: 404,
                        message: "Libro no encontrado"
                    }
                };
            }
            console.log(currentItem);

            const updatedItem: GoogleBook = {
                id: currentItem.id,
                volumeInfo: {
                    ...currentItem.volumeInfo,
                    ...(data ?? {})
                }
            };

            items[index] = updatedItem;

            fs.writeFile(
                filePath,
                JSON.stringify({ items }, null, 2),
                "utf-8"
            );

            return { data: updatedItem };

        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al actualizar la biblioteca"
                }
            };
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