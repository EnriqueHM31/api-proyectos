import { isIP } from "node:net";

export const creacionAPI = (url: string, apiKey: string) => {
    return `${url}apiKey=${apiKey}`;
};

export const validarStringVacio = (valor: any, valorPorDefecto: string = ""): string => {
    if (typeof valor === "string" && valor.trim() !== "") {
        return valor.trim(); // eliminamos espacios al inicio y final
    }
    throw new Error("El valor no es una cadena de texto");
};

export const validarSiEsUnaIp = (valor: any): string => {
    if (isIP(valor as string) === 0) {
        throw new Error("IP inválida");
    }
    return valor;
};

export const construirUrlApi = (baseUrl: string, params: Record<string, string | number>) => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value.toString());
    });
    return url.toString();
};

export function crearUrlGeolocalizacion(baseUrl: string, ip: string): string {
    return `${baseUrl}&ip=${encodeURIComponent(ip)}`;
}
