import { Router } from "express";

import { BibliotecaLibrosController } from "../../controllers/biblioteca/bibliotecaLibros.controller.js";
import { middlewareBibliotecaLibrosCrear, middlewareBibliotecaLibrosModificar, middlewareBibliotecaLibrosId } from "../../middleware/biblioteca/bibliotecaLibros.middleware.js";

export const bibliotecaLibrosRouter = Router();

const bibliotecaLibrosController = new BibliotecaLibrosController();

bibliotecaLibrosRouter.get("/", bibliotecaLibrosController.getAll);

bibliotecaLibrosRouter.get("/:id", middlewareBibliotecaLibrosId, bibliotecaLibrosController.getBook);

bibliotecaLibrosRouter.post("/", middlewareBibliotecaLibrosCrear, bibliotecaLibrosController.create);

bibliotecaLibrosRouter.put("/:id", middlewareBibliotecaLibrosId, middlewareBibliotecaLibrosModificar, bibliotecaLibrosController.update);

bibliotecaLibrosRouter.delete("/:id", middlewareBibliotecaLibrosId, bibliotecaLibrosController.delete);
