import path from "path";
import express from "express";
import type { Express } from "express";
import { SRC_ROOT } from "../utils/index.js";

export function setupStatic(app: Express) {
    app.use(express.static(path.join(SRC_ROOT, "public")));
}
