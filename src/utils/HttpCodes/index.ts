export function ValidarStringVacio(valor: any, valorPorDefecto: string = ""): string {
    if (typeof valor === "string" && valor.trim() !== "") {
        return valor.trim(); // eliminamos espacios al inicio y final
    }
    throw new Error("El valor no es una cadena de texto");
}


export function ValidarNumero(valor: any, valorPorDefecto: number = 0): number {
    const numero = Number(valor);
    if (isNaN(numero)) {
        throw new Error("El valor no es un número");
    }
    return numero;
}