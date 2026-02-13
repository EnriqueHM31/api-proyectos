import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import dataBiblioteca from "../../../data/biblioteca/libros.json" with { type: "json" };
import type { GoogleBook } from "../../../types/libro.js";

const filePath = path.resolve("src/data/biblioteca/libros.json");

export class BibliotecaLibrosModel {
    async ObtenerBibliotecaLibros(): Promise<{ data?: GoogleBook[] }> {
        const { items } = dataBiblioteca;

        if (!items) throw new Error("No se encontró ningún libro");
        return { data: items };
    }

    async ObtenerBibliotecaLibrosById(id: string): Promise<{ data?: GoogleBook }> {
        const { items } = dataBiblioteca;
        const data = items.find((item) => item.id === id);

        if (!data) throw new Error("No se encontró el libro");
        return { data };
    }

    async crearBibliotecaLibros(data: GoogleBook): Promise<{ data?: GoogleBook }> {
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
        await fs.writeFile(filePath, JSON.stringify(dataBiblioteca, null, 2), "utf-8");

        return { data: newItem };
    }

    async modificarBibliotecaLibros(id: string, data: Partial<GoogleBook>): Promise<{ data?: GoogleBook }> {
        const { items } = dataBiblioteca;

        const index = items.findIndex((item) => item.id === id);

        if (index < 0) {
            throw new Error("Libro no encontrado");
        }

        const currentItem = items[index];

        if (!currentItem) {
            throw new Error("Libro no encontrado");
        }

        console.log({ volumenInfo: data.volumeInfo });
        const updatedItem: GoogleBook = {
            id: currentItem.id,
            volumeInfo: {
                ...currentItem.volumeInfo,
                ...data,
            },
        };

        console.log({ updatedItem });

        items[index] = updatedItem;

        fs.writeFile(filePath, JSON.stringify({ items }, null, 2), "utf-8");

        return { data: updatedItem };
    }

    async eliminarBibliotecaLibros(id: string): Promise<{ data?: GoogleBook }> {
        const { items } = dataBiblioteca;

        const index = items.findIndex((item) => item.id === id);

        console.log({ index });
        if (index < 0) {
            throw new Error("No se encontró el libro");
        }

        // 🧠 Guardamos el libro antes de eliminarlo
        const deletedItem = items[index];

        // 🗑 Eliminamos
        items.splice(index, 1);

        // 💾 Persistencia REAL
        fs.writeFile(filePath, JSON.stringify({ items }, null, 2), "utf-8");

        if (!deletedItem) {
            throw new Error("Ocurrio un error al eliminar el libro");
        }

        return { data: deletedItem };
    }
}
