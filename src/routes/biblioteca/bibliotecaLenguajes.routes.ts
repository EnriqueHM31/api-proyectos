import { Router } from "express";
import { BibliotecaLenguajesController } from "../../controllers/biblioteca/bibliotecaLenguajes.controller.js";

const bibliotecaLenguajesController = new BibliotecaLenguajesController();

export const bibliotecaLenguajesRouter = Router();

bibliotecaLenguajesRouter.get("/", bibliotecaLenguajesController.getAll);

bibliotecaLenguajesRouter.get("/:id", bibliotecaLenguajesController.getLenguaje);

bibliotecaLenguajesRouter.post("/", bibliotecaLenguajesController.create);

bibliotecaLenguajesRouter.put("/:id", bibliotecaLenguajesController.update);

bibliotecaLenguajesRouter.delete("/:id", bibliotecaLenguajesController.delete);
