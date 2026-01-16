import "dotenv/config";
import express from "express";
import { PORT } from "./config/index.js";
import { setupStatic } from "./config/static.js";
import { setupViews } from "./config/view.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import { climaRouter } from "./routes/clima.routes.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";
import { homeRouter } from "./routes/home.routes.js";

/*------------------ APP ------------------*/
const app = express();
app.use(corsMiddleware);
app.use(express.json());

/*------------------ VIEWS ------------------*/
setupViews(app);
setupStatic(app);

/*------------------ ROUTES ------------------*/
app.use(homeRouter);
app.use("/geolocalizacion", geoIpRouter);
app.use("/clima", climaRouter);

/*------------------ LISTEN ------------------*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
