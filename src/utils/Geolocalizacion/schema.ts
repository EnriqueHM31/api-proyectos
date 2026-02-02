import { ipv4, z } from "zod";

export const GeolocalizacionSchema = z.object({
    ip: ipv4({
        message: "La IP debe ser una dirección IPv4",
    }).refine((v) => v.length === 4, {
        message: "La IP debe tener 4 partes",
    }),
});

export function validarGeolocalizacionCampos(data: unknown) {
    return GeolocalizacionSchema.parse(data);
}

export function validarPartialGeolocalizacionCampos(data: unknown) {
    return GeolocalizacionSchema.safeParse(data);
}
