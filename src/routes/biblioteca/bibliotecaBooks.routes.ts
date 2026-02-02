import { Router } from "express";

import { BibliotecaBooksController } from "../../controllers/biblioteca/bibliotecaBooks.controller.js";
import { middlewareBibliotecaBooksId, middlewareBibliotecaBooksCreate } from "../../middleware/biblioteca/bibliotecaBook.middleware.js";

export const bibliotecaBooksRouter = Router();

const bibliotecaBooksController = new BibliotecaBooksController();

bibliotecaBooksRouter.get("/", bibliotecaBooksController.getAll);

bibliotecaBooksRouter.get("/:id", middlewareBibliotecaBooksId, bibliotecaBooksController.getBook);

bibliotecaBooksRouter.post("/", middlewareBibliotecaBooksCreate, bibliotecaBooksController.create);

bibliotecaBooksRouter.put("/:id", middlewareBibliotecaBooksId, bibliotecaBooksController.update);

bibliotecaBooksRouter.delete("/:id", middlewareBibliotecaBooksId, bibliotecaBooksController.delete);
