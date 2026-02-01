import { Router } from "express";
import { BibliotecaController } from "../controllers/biblioteca.controller.js";

export const bibliotecaRouter = Router();

const bibliotecaController = new BibliotecaController();

bibliotecaRouter.get("/", bibliotecaController.getAll);

bibliotecaRouter.get("/:id", bibliotecaController.getBook);

bibliotecaRouter.post("/", bibliotecaController.create);

bibliotecaRouter.put("/:id", bibliotecaController.update);

bibliotecaRouter.delete("/:id", bibliotecaController.delete);