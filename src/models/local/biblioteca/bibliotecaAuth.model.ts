import path from "node:path";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import { SECRETO } from "../../../config/index.js";

interface Usuario {
    id: string;
    username: string;
    password: string;
    correo: string;
}

interface TokenPayload {
    id: string;
    username: string;
}


const filePath = path.join(process.cwd(), "src/data/biblioteca/usuarios.json");

export class bibliotecaAuthModel {
    static async IniciarSesion({ username, password }: Omit<Usuario, "id" | "correo">) {
        if (SECRETO === undefined) throw new Error("Falta el secreto");
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const usuario = data.items.find((u: Usuario) => u.username === username);
        if (!usuario) throw new Error("No se encontro un usuario con ese username");

        const ok = await compare(password, usuario.password);
        if (!ok) throw new Error("La contraseña es incorrecta");

        const token = jwt.sign({ id: usuario.id, username: usuario.username }, SECRETO, { expiresIn: "2m" });

        return {
            token,
            data: { username: usuario.username, correo: usuario.correo },
        };
    }

    static async RegistrarUsuario({ username, password, correo }: Omit<Usuario, "id">) {
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const correoExiste = data.items.find((u: Usuario) => u.correo === correo);
        console.log({ correoExiste });
        if (correoExiste) throw new Error("Ese correo ya esta vinculado a otro usuario");

        const userExiste = data.items.find((u: Usuario) => u.username === username);
        if (userExiste) throw new Error("El usuario con ese username ya existe");

        const nuevoUsuario: Usuario = {
            id: crypto.randomUUID(),
            username,
            password: await hash(password, 15),
            correo,
        };

        data.items.push(nuevoUsuario);

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

        return { data: { username: nuevoUsuario.username, correo: nuevoUsuario.correo } };
    }

    static async ObtenerUsuario({ username }: Partial<Usuario>) {
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const usuario = data.items.find((u: Usuario) => u.username === username);
        if (!usuario) throw new Error("Usuario no encontrado");

        return { data: usuario };
    }


    static async CerrarSesion({ token }: { token: string }) {

        if (SECRETO === undefined) throw new Error("Falta el secreto");
        const decoded = jwt.verify(token, SECRETO) as unknown as TokenPayload;
        const { id, username } = decoded;
        const file = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(file);

        const usuario = data.items.find((u: Usuario) => u.id === id);
        if (!usuario) throw new Error("Usuario no encontrado");

        if (usuario.username !== username) throw new Error("No se puede cerrar sesión de otro usuario");

        return { data: usuario };
    }
}
