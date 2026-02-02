export class IpModel {
    async getIp({ url }: { url: string }) {
        const response = await fetch(url);

        if (!response.ok) {
            const data = (await response.json()) as { message?: string };

            throw new Error(data.message ?? "Error en el servicio de geolocalización");
        }

        const data = await response.json();

        return data;
    }
}
