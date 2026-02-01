import { Router } from "express";
import { BibliotecaController } from "../controllers/biblioteca.controller.js";
import { middlewareBibliotecaId, middlewareBibliotecaCreate } from "../middleware/biblioteca.middleware.js";

export const bibliotecaRouter = Router();

const bibliotecaController = new BibliotecaController();

bibliotecaRouter.get("/", bibliotecaController.getAll);

bibliotecaRouter.get("/:id", middlewareBibliotecaId, bibliotecaController.getBook);

bibliotecaRouter.post("/", middlewareBibliotecaCreate, bibliotecaController.create);

bibliotecaRouter.put("/:id", middlewareBibliotecaId, bibliotecaController.update);

bibliotecaRouter.delete("/:id", middlewareBibliotecaId, bibliotecaController.delete);