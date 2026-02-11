import cookiesParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { PORT } from "./config/index.js";
import { setupStatic } from "./config/static.js";
import { setupViews } from "./config/view.js";
import { createCorsMiddleware } from "./middleware/cors.middleware.js";
import { bibliotecaRouter } from "./routes/biblioteca.routes.js";
import { climaRouter } from "./routes/clima.routes.js";
import emailRouter from "./routes/email.routes.js";
import { geoIpRouter } from "./routes/geoIp.routes.js";
import { homeRouter } from "./routes/home.routes.js";
import { httpCodesRouter } from "./routes/http-codes.routes.js";

/*------------------ APP ------------------*/
const app = express();
app.use(createCorsMiddleware());
app.use(express.json());

app.use(cookiesParser());

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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
