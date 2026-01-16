import path from "path";
import type { Express } from "express";
import { SRC_ROOT } from "../utils/index.js";

export function setupViews(app: Express) {
    app.set("view engine", "ejs");
    app.set("views", path.join(SRC_ROOT, "views"));
}
