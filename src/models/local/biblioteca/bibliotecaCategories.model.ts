import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import dataCategories from "../../../data/categories.json" with { type: "json" };
import path from "node:path";
interface Categories {
    id: string;
    nombre: string;
    descripcion: string;
}

const filePath = path.resolve("src/data/categories.json");

export class BibliotecaCategoriesModel {
    async getBiblioteca(): Promise<{ data?: Categories[]; error?: { code: number; message: string } }> {
        try {
            const { items } = dataCategories;

            return { data: items };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async getBibliotecaById(id: string): Promise<{ data?: Categories; error?: { code: number; message: string } }> {
        try {
            const { items } = dataCategories;
            const data = items.find((item) => item.id === id);

            if (!data) throw new Error("No se encontró el libro");
            return { data };
        } catch (error) {
            throw new Error(error as string);
        }
    }
    async createBiblioteca(data: Categories): Promise<{ data?: Categories; error?: { code: number; message: string } }> {
        try {
            // 1️⃣ Leer archivo JSON
            console.log(data);
            const file = await fs.readFile(filePath, "utf-8");
            const dataBiblioteca = JSON.parse(file);

            // 2️⃣ Crear nuevo item
            const newItem: Categories & { id: string } = {
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
    async updateBiblioteca(id: string, data: Partial<Categories>): Promise<{ data?: Categories; error?: { code: number; message: string } }> {
        try {
            const { items } = dataCategories;

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

            const updatedItem: Categories = {
                id: currentItem.id,
                nombre: currentItem.nombre,
                descripcion: currentItem.descripcion,
            };

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

    async deleteBiblioteca(id: string): Promise<{ data?: Categories; error?: { code: number; message: string } }> {
        try {
            const { items } = dataCategories;

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
