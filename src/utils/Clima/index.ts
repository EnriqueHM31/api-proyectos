type ClimaParams = {
    lugar: string;
    days?: string; // opcional, por si quieres dejar un valor por defecto
};

export function crearUrlClima(baseUrl: string, { lugar, days = "1" }: ClimaParams): string {
    const params = new URLSearchParams({
        q: lugar,
        days: days,
    });

    return `${baseUrl}&${params.toString()}`;
}

export function validarDays(days: any, defaultDays = 1, maxDays = 10): number {
    const numero = Number(days);

    if (isNaN(numero) || numero < 1) {
        return defaultDays; // si no es un número o es menor a 1, usar valor por defecto
    }

    if (numero > maxDays) {
        return maxDays; // limitar al máximo permitido
    }

    return Math.floor(numero); // aseguramos que sea un entero
}

export function validarString(valor: any, valorPorDefecto: string = ""): string {
    if (typeof valor === "string" && valor.trim() !== "") {
        return valor.trim(); // eliminamos espacios al inicio y final
    }
    throw new Error("El valor no es una cadena de texto");
}
