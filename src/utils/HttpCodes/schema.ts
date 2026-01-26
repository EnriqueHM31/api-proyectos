import { z } from "zod";

export const HttpCodesSchema = z.object({
    code: z.coerce.number({ message: "El código debe ser un número" }).min(100, { message: "El código no puede ser menor a 100" }).max(599, { message: "El código no puede ser mayor a 599" }),
});

export function validarHttpCodesCampos(data: unknown) {
    return HttpCodesSchema.parse(data);
}

export function validarPartialHttpCodesCampos(data: unknown) {
    return HttpCodesSchema.safeParse(data);
}