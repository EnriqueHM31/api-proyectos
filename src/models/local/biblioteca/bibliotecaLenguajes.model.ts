import { randomUUID } from "node:crypto";
import dataBibliotecaLenguajes from "../../../data/lenguajes.json" with { type: "json" };

export class BibliotecaLenguajesModel {
    async getBibliotecaLenguajes(): Promise<{ data?: { Id: string; Nombre: string; Abreviacion: string }[] }> {

        const { Items } = dataBibliotecaLenguajes;

        if (!Items) throw new Error("No se encontró ningún lenguaje");

        return { data: Items };
    }

    async getBibliotecaLenguajesById(id: string): Promise<{ data?: { Id: string; Nombre: string; Abreviacion: string } }> {

        const data = dataBibliotecaLenguajes.Items.find((item) => item.Id === id);

        if (!data) throw new Error("No se encontró el lenguaje");

        return { data };
    }

    async createBibliotecaLenguajes(data: { Id: string; Nombre: string; Abreviacion: string }): Promise<{ data?: { Id: string; Nombre: string; Abreviacion: string } }> {

        const newItem: typeof data & { Id: string } = {
            ...data,
            Id: randomUUID(),
        };

        dataBibliotecaLenguajes.Items.push(newItem);

        return { data: newItem };
    }

    async updateBibliotecaLenguajes(id: string, data: Partial<{ Id: string; Nombre: string; Abreviacion: string }>): Promise<{ data?: { Id: string; Nombre: string; Abreviacion: string } }> {
        const { Items } = dataBibliotecaLenguajes;

        const index = Items.findIndex((item) => item.Id === id);

        if (index === -1) {
            throw new Error("No se encontró el lenguaje");
        }

        const currentItem = Items[index];

        if (!currentItem) {
            throw new Error("No se encontró el lenguaje");
        }

        const updatedItem: typeof data & { Id: string } = {
            Id: currentItem.Id,
            Nombre: currentItem.Nombre,
            Abreviacion: currentItem.Abreviacion,
            ...data,
        } as { Id: string; Nombre: string; Abreviacion: string };

        console.log({ updatedItem });

        Items[index] = updatedItem as { Id: string; Nombre: string; Abreviacion: string };

        return { data: updatedItem as { Id: string; Nombre: string; Abreviacion: string } };
    }

    async deleteBibliotecaLenguajes(id: string): Promise<{ data?: { Id: string; Nombre: string; Abreviacion: string } }> {
        const { Items } = dataBibliotecaLenguajes;

        const index = Items.findIndex((item) => item.Id === id);

        console.log({ index });
        if (index < 0) {
            throw new Error("No se encontró el libro");
        }

        // 🧠 Guardamos el libro antes de eliminarlo
        const deletedItem = Items[index];

        // 🗑 Eliminamos
        Items.splice(index, 1);

        if (!deletedItem) {
            throw new Error("Ocurrio un error al eliminar el libro");
        }

        return { data: deletedItem };
    }
}       