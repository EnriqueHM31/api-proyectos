import { Router } from "express";
import { BibliotecaController } from "../controllers/biblioteca.controller.js";
import { middlewareBibliotecaCreate } from "../middleware/biblioteca.middleware.js";

export const bibliotecaRouter = Router();

const bibliotecaController = new BibliotecaController();

bibliotecaRouter.get("/", bibliotecaController.getAll);

bibliotecaRouter.get("/:id", bibliotecaController.getBook);

bibliotecaRouter.post("/", middlewareBibliotecaCreate, bibliotecaController.create);

bibliotecaRouter.put("/:id", bibliotecaController.update);

bibliotecaRouter.delete("/:id", bibliotecaController.delete);