import path from "node:path";
import Usuarios from "../../../data/biblioteca/usuarios.json" with { type: "json" };

interface Usuario {
    id: string;
    username: string;
    password: string;
    correo: string;
}
const filePath = path.resolve("src/data/biblioteca/usuarios.json");

export class bibliotecaAuthModel {
    static async IniciarSesion({ username, password }: Partial<Usuario>) {
        const { items } = Usuarios;

    }

    static async RegistrarUsuario({ username, password, correo }: Partial<Usuario>) {
        const { items } = Usuarios;

        const usuarioCorreo = items.find((item) => item.correo === correo);

        if (usuarioCorreo) {
            throw new Error("El correo que trataste de registrar ya existe");
        }

        const usuarioUsername = items.find((item) => item.username === username);

        if (usuarioUsername) {
            throw new Error("El usuario que trataste de registrar ya existe");
        }


    }

    static async ObtenerUsuario({ correo, username }: Partial<Usuario>) {
        const { items } = Usuarios;
    }
}