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

/*------------------ LISTEN ------------------*/
app.listen(PORT, '192.168.1.73', () => {
    console.log(`Server running on http://192.168.1.73:${PORT}`);
});
