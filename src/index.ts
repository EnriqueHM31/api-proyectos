import dotenv from "dotenv";
import express from "express";
import path from "path";
import { PORT } from "./config/index.js";
import { homeRouter } from "./routes/index.js";
import { SRC_ROOT } from "./utils/index.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";

/*------------------ ENV ------------------*/
dotenv.config();

/*------------------ APP ------------------*/
const app = express();
app.use(express.json());

/*------------------ VIEWS ------------------*/
app.set("view engine", "ejs");
app.set("views", path.join(SRC_ROOT, "views"));
app.use(express.static(path.join(SRC_ROOT, "public")));

/*------------------ ROUTES ------------------*/
app.use(homeRouter);
app.use("/geolocalizacion", geoIpRouter);

/*------------------ LISTEN ------------------*/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
