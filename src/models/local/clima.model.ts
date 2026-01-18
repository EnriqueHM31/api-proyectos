export class ClimaModel {
    async getClima({ url }: { url: string }) {
        try {
            const response = await fetch(url);

            // 4️⃣ Manejo de error HTTP
            if (!response.ok) {
                const data = await response.json() as { error?: { code: number, message: string } };
                return {
                    error: {
                        code: data.error?.code,
                        message: data.error?.message
                    }
                };
            }

            // 5️⃣ Parseo seguro
            const data = await response.json();
            return data;
            
        } catch (error) {
            return {
                error: {
                    code: 500,
                    message: "Error interno del servidor"
                }
            };
        }
    }
}