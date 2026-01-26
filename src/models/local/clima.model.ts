export class ClimaModel {
    async getClima({ url }: { url: string }): Promise<{ error?: { code: number, message: string } }> {
        try {
            const response = await fetch(url);
            const data = await response.json() as { error?: { code: number, message: string } };

            if (!response.ok) {
                return {
                    error: {
                        code: data.error?.code ?? response.status,
                        message: data.error?.message ?? "Error desconocido"
                    }
                };
            }

            return data;
        } catch (error) {
            return {
                error: {
                    code: 500,
                    message: error as string
                }
            };
        }
    }
}
