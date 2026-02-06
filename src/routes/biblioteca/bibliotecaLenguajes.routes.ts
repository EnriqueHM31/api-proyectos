import { Router } from "express";
import { BibliotecaLenguajesController } from "../../controllers/biblioteca/bibliotecaLenguajes.controller.js";
import { middlewareBibliotecaLenguajesCreate, middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesUpdate } from "../../middleware/biblioteca/bibliotecaLenguajes.middleware.js";

const bibliotecaLenguajesController = new BibliotecaLenguajesController();

export const bibliotecaLenguajesRouter = Router();

bibliotecaLenguajesRouter.get("/", bibliotecaLenguajesController.getAll);

bibliotecaLenguajesRouter.get("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.getLenguaje);

bibliotecaLenguajesRouter.post("/", middlewareBibliotecaLenguajesCreate, bibliotecaLenguajesController.create);

bibliotecaLenguajesRouter.put("/:id", middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesUpdate, bibliotecaLenguajesController.update);

bibliotecaLenguajesRouter.delete("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.delete);
