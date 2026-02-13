import { z } from "zod";

export const schemaUsuario = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
    username: z.string({ message: "El nombre de usuario es requerido" }).min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }).max(20, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
    password: z.string({ message: "La contraseña es requerida" }).min(8, { message: "La contraseña debe tener al menos 8 caracteres" }).max(20, { message: "La contraseña debe tener al menos 8 caracteres" }),
    correo: z.string({ message: "El correo es requerido" }).email({ message: "El correo debe ser un correo válido" }),
});


const bibliotecaUsuarioCreareSchema = schemaUsuario.omit({
    id: true,
});

const bibliotecaUsuarioLoginSchema = schemaUsuario.omit({
    id: true,
    correo: true,
});

export function validarBibliotecaUsuarioCrear(data: unknown) {
    return bibliotecaUsuarioCreareSchema.parse(data);
}

export function validarBibliotecaUsuarioLogin(data: unknown) {
    return bibliotecaUsuarioLoginSchema.parse(data);
}

const bibliotecaUsuarioModificarSchema = schemaUsuario
    .omit({ id: true })
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debe enviar al menos un campo para actualizar",
    });


export function validarBibliotecaUsuarioModificar(data: unknown) {
    return bibliotecaUsuarioModificarSchema.safeParse(data);
}

const bibliotecaUsuarioIdSchema = z.object({
    id: z.string({ message: "El id es requerido" }).uuid({ message: "El id debe ser un UUID válido" }),
});

export function validarBibliotecaUsuarioId(data: unknown) {
    return bibliotecaUsuarioIdSchema.safeParse(data);
}
