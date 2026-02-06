import { Router } from "express";
import { BibliotecaLenguajesController } from "../../controllers/biblioteca/bibliotecaLenguajes.controller.js";
import { middlewareBibliotecaLenguajesCrear, middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesModificar } from "../../middleware/biblioteca/bibliotecaLenguajes.middleware.js";

const bibliotecaLenguajesController = new BibliotecaLenguajesController();

export const bibliotecaLenguajesRouter = Router();

bibliotecaLenguajesRouter.get("/", bibliotecaLenguajesController.getAll);

bibliotecaLenguajesRouter.get("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.getLenguaje);

bibliotecaLenguajesRouter.post("/", middlewareBibliotecaLenguajesCrear, bibliotecaLenguajesController.create);

bibliotecaLenguajesRouter.put("/:id", middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesModificar, bibliotecaLenguajesController.update);

bibliotecaLenguajesRouter.delete("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.delete);
