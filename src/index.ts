import "dotenv/config";
import express from "express";
import path from "path";
import { PORT } from "./config/index.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import { climaRouter } from "./routes/clima.routes.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";
import { homeRouter } from "./routes/home.routes.js";
import { SRC_ROOT } from "./utils/index.js";

/*------------------ APP ------------------*/
const app = express();
app.use(corsMiddleware);
app.use(express.json());

/*------------------ VIEWS ------------------*/
app.set("view engine", "ejs");
app.set("views", path.join(SRC_ROOT, "views"));
app.use(express.static(path.join(SRC_ROOT, "public")));

/*------------------ ROUTES ------------------*/
app.use(homeRouter);
app.use("/geolocalizacion", geoIpRouter);
app.use("/clima", climaRouter);

/*------------------ LISTEN ------------------*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
