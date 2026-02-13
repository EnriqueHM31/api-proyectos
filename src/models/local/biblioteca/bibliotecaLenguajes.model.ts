import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

interface Lenguaje {
    id: string;
    nombre: string;
    abreviacion: string;
}

const filePath = path.resolve("src/data/biblioteca/lenguajes.json") as string;

export class BibliotecaLenguajesModel {
    /* =========================
       GET ALL
    ========================= */
    async getBibliotecaLenguajes(): Promise<{ data?: Lenguaje[]; error?: { code: number; message: string } }> {
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const json = JSON.parse(file);

            if (!Array.isArray(json.items)) {
                return { data: [] };
            }

            return { data: json.items };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al obtener lenguajes",
                },
            };
        }
    }

    /* =========================
       GET BY ID
    ========================= */
    async getBibliotecaLenguajesById(id: string): Promise<{ data?: Lenguaje; error?: { code: number; message: string } }> {
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const json = JSON.parse(file);

            const item = json.items.find((i: Lenguaje) => i.id === id);

            if (!item) {
                return {
                    error: {
                        code: 404,
                        message: "Lenguaje no encontrado",
                    },
                };
            }

            return { data: item };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al obtener lenguaje",
                },
            };
        }
    }

    /* =========================
       CREATE
    ========================= */
    async createBibliotecaLenguajes(data: Omit<Lenguaje, "id">): Promise<{ data?: Lenguaje; error?: { code: number; message: string } }> {
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const json = JSON.parse(file);

            const newItem: Lenguaje = {
                id: randomUUID(),
                nombre: data.nombre,
                abreviacion: data.abreviacion,
            };

            if (!Array.isArray(json.items)) {
                json.items = [];
            }

            json.items.push(newItem);

            await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

            return { data: newItem };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al crear lenguaje",
                },
            };
        }
    }

    /* =========================
       UPDATE
    ========================= */
    async updateBibliotecaLenguajes(
        id: string,
        data: Partial<Omit<Lenguaje, "id">>
    ): Promise<{ data?: Partial<Lenguaje>; error?: { code: number; message: string } }> {
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const json = JSON.parse(file);

            const index = json.items.findIndex((i: Lenguaje) => i.id === id);

            if (index === -1) {
                return {
                    error: {
                        code: 404,
                        message: "Lenguaje no encontrado",
                    },
                };
            }

            const current = json.items[index];

            const updated: Lenguaje = {
                id: current.id,
                nombre: data.nombre ?? current.nombre,
                abreviacion: data.abreviacion ?? current.abreviacion,
            };

            json.items[index] = updated;

            await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

            const response: Partial<Lenguaje> = { id };

            if ("nombre" in data) response.nombre = updated.nombre;
            if ("abreviacion" in data) response.abreviacion = updated.abreviacion;

            return { data: response };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al actualizar lenguaje",
                },
            };
        }
    }

    /* =========================
       DELETE
    ========================= */
    async deleteBibliotecaLenguajes(id: string): Promise<{ data?: Lenguaje; error?: { code: number; message: string } }> {
        try {
            const file = await fs.readFile(filePath, "utf-8");
            const json = JSON.parse(file);

            const index = json.items.findIndex((i: Lenguaje) => i.id === id);

            if (index === -1) {
                return {
                    error: {
                        code: 404,
                        message: "Lenguaje no encontrado",
                    },
                };
            }

            const deleted = json.items[index];

            json.items.splice(index, 1);

            await fs.writeFile(filePath, JSON.stringify(json, null, 2), "utf-8");

            return { data: deleted };
        } catch {
            return {
                error: {
                    code: 500,
                    message: "Error al eliminar lenguaje",
                },
            };
        }
    }
}
