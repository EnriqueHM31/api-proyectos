# API - Geolocalización IP (api-proyectos)

✅ **Descripción breve**

API sencilla que expone un servicio para obtener la geolocalización de una IP usando el servicio externo ipgeolocation.io y presenta una vista principal con los proyectos.

---

## 📌 Resumen

- **Nombre:** api-proyectos
- **Propósito:** Proveer un endpoint que devuelve la información de geolocalización para una IP (proxy hacia ipgeolocation.io v2/ipgeo).
- **Stack:** Node.js + TypeScript + Express + EJS
- **Puerto por defecto:** 3000 (configurable vía `PORT`)

---

## 🧭 Endpoints

### 1) Obtener geolocalización por IP

- **Ruta:** `GET /geolocalizacion/:ip`
- **Descripción:** Valida la IP, arma la URL al servicio externo (`https://api.ipgeolocation.io/v2/ipgeo`) añadiendo la `apiKey` desde la variable de entorno y reenvía la respuesta JSON recibida del servicio. No transforma el payload: lo devuelve tal cual lo devuelve ipgeolocation.io.
- **Parámetros:**

  - `:ip` (path) — IPv4, IPv6 o dominio.

- **Respuestas:**

  - 200 OK — JSON con la información de geolocalización (estructura definida por ipgeolocation.io; incluye `ip`, `location`, `country_metadata`, `network`, `currency`, `security`, `time_zone`, `abuse`, `user_agent`, ...).

  - 400 Bad Request — Si falta la IP o el formato es inválido. Ejemplos:

    - { "message": "La IP es requerida" }
    - { "message": "IP inválida" }

  - {status} — Si la API externa responde con un error, se reenvía el status code y un JSON con `message` (por ejemplo 401 con mensaje del proveedor).

  - 500 Internal Server Error — Si ocurre una excepción interna y aún no se han enviado headers:
    - { "error": "Error interno del servidor" }

- **Ejemplo (curl):**

  curl -X GET "http://localhost:3000/geolocalizacion/8.8.8.8"

  (El body devuelto es el mismo que devuelve ipgeolocation.io para ese IP.)

---

### 2) Página principal (vista)

- **Ruta:** `GET /` (renderiza `views/home.ejs`).
- **Descripción:** Página con la lista de proyectos (se obtiene desde `utils/getProjects`). Muestra el proyecto "Geolocalización IP" y su endpoint.

---

## ⚙️ Configuración y variables de entorno

Crea un archivo `.env` en la raíz con (ejemplo):

```
PORT=3000
API_KEY_IP=TU_API_KEY_DE_IPGEOLOCATION
```

- **API_KEY_IP (required)** - clave para consumir ipgeolocation.io. Si no se provee el valor, el proyecto aún compila pero las llamadas a la API externa fallarán (la constante se construye desde `process.env.API_KEY_IP ?? ""`).
- **PORT (opcional)** - puerto donde corre la app (por defecto 3000).

> 🔐 Mantén `API_KEY_IP` fuera del control de versiones (añádelo a `.gitignore`).

---

## 🚀 Instalación y ejecución

Requisitos: Node 18+ recomendado

1. Clonar el repositorio
2. Instalar dependencias

```
npm install
```

3. Ejecutar en modo desarrollo

```
npm run dev
```

4. Compilar y ejecutar en producción

```
npm run build
npm start
```

---

## 🧩 Estructura del proyecto

- `src/index.ts` — punto de entrada (configura CORS, vistas, rutas y el puerto).
- `src/routes/geoIp.routes.ts` — router `/geolocalizacion`.
- `src/controllers/ip.controller.ts` — lógica de validación y proxy a ipgeolocation.
- `src/constants/geolocalizacionIp/index.ts` — `URL_GEOLOCALIZACION_IP` y `API_KEY_IP_GEOLOCALIZACION`.
- `src/utils/Geolocalizacion/index.ts` — utilidad para componer la URL con `apiKey`.
- `src/views/home.ejs` — vista principal que muestra proyectos.

---

## 🔍 Validaciones principales

- Se valida que `:ip` exista en la ruta — si no, 400 con mensaje "La IP es requerida".
- Se valida formato de IP con `node:net isIP` — si inválida, 400 con mensaje "IP inválida".
- Si el servicio externo responde con error HTTP, el controlador reenvía su `status` con un JSON `{ message }`.
- Si ocurre excepción y no se han enviado headers, se responde 500 con `{ error: "Error interno del servidor" }`.

---

## 🧾 Ejemplos de uso y filtros compatibles

La API interna actúa como proxy hacia ipgeolocation v2, por lo que soporta los mismos query params que ofrece el proveedor:

- `fields` — para filtrar solo ciertos campos (p. ej. `fields=location`)
- `include` — para incluir módulos opcionales (p. ej. `include=security`)
- `excludes` — excluir campos que no necesite
- `lang` — para idioma (según plan)

Ejemplo:

```
GET /geolocalizacion/8.8.8.8?fields=location&include=security
```

> Nota: Como proxy, el controlador añade `apiKey` por su cuenta — no es necesario enviarla en la petición al servidor propio.

---

## 📌 Seguridad y buenas prácticas

- No exponer la `API_KEY_IP` públicamente ni en el frontend.
- Habilitar límites de peticiones a la ruta `/geolocalizacion` si se prevé alto tráfico o abuso (rate-limiting).
- Manejar logging y métricas para detectar fallos del proveedor externo.

---

## 🧪 Tests

Actualmente no hay pruebas unitarias incluidas. Recomendación:

- Añadir tests para `IpController.getIp` simulando respuestas exitosas y errores del proveedor.
- Testear validaciones de IP (existencia y formato).

---

## 💡 Consejos de desarrollo

- Para debugear localmente puede usarse `nodemon --exec tsx src/index.ts` (ya está configurado en `npm run dev`).
- CORS por defecto permite `http://localhost:5173` — actualizar según necesidades.

---

## 👤 Autor

**Luis Enrique Hernandez Marin**

---

## 📄 Licencia

ISC

---

Si quieres, puedo añadir ejemplos concretos de respuestas, snippets de código cliente (JS/Python/Postman) o documentar el contrato JSON de `ipgeolocation.io` con más detalle. ¿Quieres que incluya ejemplos reales de respuesta (truncados) para cada módulo (`location`, `network`, `security`, etc.)?
