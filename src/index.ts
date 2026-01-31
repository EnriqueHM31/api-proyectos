import "dotenv/config";
import express from "express";
import { PORT } from "./config/index.js";
import { setupStatic } from "./config/static.js";
import { setupViews } from "./config/view.js";
import { createCorsMiddleware } from "./middleware/cors.middleware.js";
import { climaRouter } from "./routes/clima.routes.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";
import { homeRouter } from "./routes/home.routes.js";
import { httpCodesRouter } from "./routes/http-codes.routes.js";
import emailRouter from "./routes/email.routes.js";
import { bibliotecaRouter } from "./routes/biblioteca.routes.js";

/*------------------ APP ------------------*/
const app = express();
app.use(createCorsMiddleware());
app.use(express.json());

/*------------------ VIEWS ------------------*/
setupViews(app);
setupStatic(app);

/*------------------ ROUTES ------------------*/
app.use(homeRouter);
app.use("/geolocalizacion", geoIpRouter);
app.use("/clima", climaRouter);
app.use("/http-codes", httpCodesRouter);
app.use("/biblioteca", bibliotecaRouter);
app.use("/email", emailRouter);

/*------------------ LISTEN ------------------*/
app.listen(PORT, '192.168.1.73', () => {
    console.log(`Server running on http://192.168.1.73:${PORT}`);
});
