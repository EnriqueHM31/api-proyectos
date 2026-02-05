import path from "node:path";
import { fileURLToPath } from "node:url";

// Ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Directorio del archivo actual
const __dirname = path.dirname(__filename);

// 👉 Raíz de src
const SRC_ROOT = path.resolve(__dirname, "..");

export { __dirname, __filename, SRC_ROOT };

export function validarMessageError(error: any, messageDefecto: string) {
    return error instanceof Error ? error.message : messageDefecto;
}


export function extraerDatosError(error: any) {
    const messageError =
        error instanceof Error ? error.message : "Error desconocido";

    const errorName = error instanceof Error ? error.name : "Error ";

    return { messageError, errorName };
}
export function formatoRespuesta({ ok, message, error, data }: { ok: boolean; message: string; error: any; data: any }) {
    return {
        ok: ok,
        message: message,
        error: error,
        data: data,
    };
}

