import dotenv from "dotenv";
import express from "express";
import path from "path";
import { PORT } from "./config/index.js";
import router from "./routes/index.js";
import { SRC_ROOT } from "./utils/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(SRC_ROOT, "views"));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
