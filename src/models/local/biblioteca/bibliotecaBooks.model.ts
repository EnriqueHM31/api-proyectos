import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import dataBiblioteca from "../../../data/biblioteca.json" with { type: "json" };
import type { GoogleBook } from "../../../types/libro.js";
const filePath = path.resolve("src/data/biblioteca.json");

export class BibliotecaBooksModel {
    async getBibliotecaBooks(): Promise<{ data?: GoogleBook[]; error?: { code: number; message: string } }> {
        try {
            const { items } = dataBiblioteca;

            return { data: items };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getBibliotecaBooksById(id: string): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            const { items } = dataBiblioteca;
            const data = items.find((item) => item.id === id);

            if (!data) throw new Error("No se encontró el libro");
            return { data };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async createBibliotecaBooks(data: GoogleBook): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            // 1️⃣ Leer archivo JSON
            console.log(data);
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
            await fs.writeFile(filePath, JSON.stringify(dataBiblioteca, null, 2), "utf-8");

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
    async updateBibliotecaBooks(id: string, data: Partial<GoogleBook>): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            const { items } = dataBiblioteca;

            const index = items.findIndex((item) => item.id === id);

            if (index === -1) {
                return {
                    error: {
                        code: 404,
                        message: "Libro no encontrado",
                    },
                };
            }

            const currentItem = items[index];

            if (!currentItem) {
                return {
                    error: {
                        code: 404,
                        message: "Libro no encontrado",
                    },
                };
            }
            console.log(currentItem);

            console.log(data);
            const updatedItem: GoogleBook = {
                id: currentItem.id,
                volumeInfo: {
                    ...currentItem.volumeInfo,
                    ...data.volumeInfo
                },
            };

            console.log(updatedItem);


            items[index] = updatedItem;

            fs.writeFile(filePath, JSON.stringify({ items }, null, 2), "utf-8");

            return { data: updatedItem };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al actualizar la biblioteca",
                },
            };
        }
    }

    async deleteBibliotecaBooks(id: string): Promise<{ data?: GoogleBook; error?: { code: number; message: string } }> {
        try {
            const { items } = dataBiblioteca;

            const index = items.findIndex((item) => item.id === id);

            if (index === -1) {
                return {
                    error: {
                        code: 404,
                        message: "Libro no encontrado",
                    },
                };
            }

            // 🧠 Guardamos el libro antes de eliminarlo
            const deletedItem = items[index];

            // 🗑 Eliminamos
            items.splice(index, 1);

            // 💾 Persistencia REAL
            fs.writeFile(filePath, JSON.stringify({ items }, null, 2), "utf-8");

            if (!deletedItem) {
                return {
                    error: {
                        code: 404,
                        message: "Ocurrio un error al eliminar el libro",
                    },
                };
            }
            return { data: deletedItem };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al eliminar el libro",
                },
            };
        }
    }
}
