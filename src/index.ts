import "dotenv/config";
import express from "express";
import path from "path";
import { PORT } from "./config/index.js";
import { homeRouter } from "./routes/index.js";
import { SRC_ROOT } from "./utils/index.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";
import cors from "cors";
/*------------------ ENV ------------------*/

/*------------------ APP ------------------*/
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}));
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
