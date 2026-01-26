import HttpCodes from "../../data/http-codes.json" with { type: "json" };


export class HttpCodesModel {
    async getHttpCodes() {
        if (!HttpCodes) {
            throw new Error("No hay códigos HTTP disponibles");
        }

        return HttpCodes;
    }

    async getHttpCode({ code }: { code: string }) {
        if (!HttpCodes) {
            throw new Error("No hay códigos HTTP disponibles");
        }

        const httpCode = HttpCodes.find((httpCode) => httpCode.code === Number(code));

        if (!httpCode) {
            throw new Error("Código HTTP no encontrado");
        }

        return httpCode;
    }
}