import path from "node:path";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs/promises";

interface Usuario {
    id: string;
    username: string;
    password: string;
    correo: string;
}

const filePath = path.join(process.cwd(), "src/data/biblioteca/usuarios.json");

export class bibliotecaAuthModel {

    static async IniciarSesion({ username, password }: Omit<Usuario, "id" | "correo">) {
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const usuario = data.items.find((u: Usuario) => u.username === username);
        if (!usuario) throw new Error("Usuario no encontrado");

        const ok = await compare(password, usuario.password);
        if (!ok) throw new Error("Password incorrecto");

        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            "secreto",
            { expiresIn: "1h" }
        );

        return {
            token,
            data: { username: usuario.username, correo: usuario.correo }
        };
    }

    static async RegistrarUsuario({ username, password, correo }: Omit<Usuario, "id">) {
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const correoExiste = data.items.find((u: Usuario) => u.correo === correo);
        if (correoExiste) throw new Error("Ese correo ya esta vinculado a otro usuario");

        const userExiste = data.items.find((u: Usuario) => u.username === username);
        if (userExiste) throw new Error("El usuario con ese username ya existe");

        const nuevoUsuario: Usuario = {
            id: crypto.randomUUID(),
            username,
            password: await hash(password, 10),
            correo,
        };

        data.items.push(nuevoUsuario);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

        return { data: nuevoUsuario };
    }

    static async ObtenerUsuario({ username }: Partial<Usuario>) {
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const usuario = data.items.find((u: Usuario) => u.username === username);
        if (!usuario) throw new Error("Usuario no encontrado");

        return { data: usuario };
    }
}
