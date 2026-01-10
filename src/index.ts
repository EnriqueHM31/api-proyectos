import dotenv from "dotenv";
import express from "express";
import path from "path";
import { getProjects } from "./utils/projects.js";
import { PORT } from "./config/index.js";
dotenv.config();

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_req, res) => {
    res.render("home", {
        projects: getProjects(),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
