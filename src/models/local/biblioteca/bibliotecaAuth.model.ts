import path from "node:path";
import Usuarios from "../../../data/biblioteca/usuarios.json" with { type: "json" };
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs";
import { hash } from "bcrypt";



interface Usuario {
    id: string;
    username: string;
    password: string;
    correo: string;
}
const filePath = path.resolve("src/data/biblioteca/usuarios.json");

export class bibliotecaAuthModel {
    static async IniciarSesion({ username, password }: Omit<Usuario, "id" | "correo">) {
        const { items } = Usuarios;
        console.log(filePath);

        const usuario = items.find((item) => item.username === username);

        if (!usuario) {
            throw new Error("No se encontro un usuario con ese nombre");
        }
        const passwordCorrecto = await compare(password, usuario.password);

        if (!passwordCorrecto) {
            throw new Error("La contraseña es incorrecta");
        }

        const token = jwt.sign({ id: usuario.id, username: usuario.username }, "secreto", {
            expiresIn: "1h",
        });

        return { token, data: { username: usuario.username, correo: usuario.correo } };
    }

    static async RegistrarUsuario({ username, password, correo }: Omit<Usuario, "id">) {
        const { items } = Usuarios;

        const usuarioCorreo = items.find((item) => item.correo === correo);

        if (usuarioCorreo) {
            throw new Error("El correo que trataste de registrar ya existe");
        }

        const usuarioUsername = items.find((item) => item.username === username);

        if (usuarioUsername) {
            throw new Error("El usuario que trataste de registrar ya existe");
        }


        const uuid = crypto.randomUUID();
        const passwordHash = await hash(password, 10);
        const nuevoUsuario: Usuario = {
            id: uuid,
            username,
            password: passwordHash,
            correo,
        };

        const fileWriter = fs.createWriteStream(filePath, { flags: "a" });
        fileWriter.write(JSON.stringify(nuevoUsuario) + "\n");



    }

    static async ObtenerUsuario({ username }: Partial<Usuario>) {
        const { items } = Usuarios;

        const usuario = items.find((item) => item.username === username);

        if (!usuario) {
            throw new Error("No se encontro un usuario con ese nombre");
        }

        return { data: usuario };
    }
}