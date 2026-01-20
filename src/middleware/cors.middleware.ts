// src/middlewares/cors.middleware.ts
import cors, { type CorsOptions } from 'cors';


const allowedOrigins = [
    'http://localhost:3000',
    'https://api-proyectos.vercel.app',
    'http://localhost:5173',
    'http://localhost:4321',
    'http://192.168.1.73:5173/',
    'http://192.168.1.73:4321/',
    'http://192.168.1.73:5173',


];
export function createCorsMiddleware() {
    const options: CorsOptions = {
        origin(origin, callback) {
            // Permite requests sin origin (Postman, curl, SSR)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error(`CORS not allowed for origin: ${origin}`));
        },
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    };

    return cors(options);
}
