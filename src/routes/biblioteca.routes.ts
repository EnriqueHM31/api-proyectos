import { Router } from "express";
import { BibliotecaController } from "../controllers/biblioteca.controller.js";

export const bibliotecaRouter = Router();

const bibliotecaController = new BibliotecaController();

bibliotecaRouter.get("/", bibliotecaController.getAll);