import { Router } from "express";
import { BibliotecaLenguajesController } from "../../controllers/biblioteca/bibliotecaLenguajes.controller.js";
import { middlewareBibliotecaLenguajesCrear, middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesModificar } from "../../middleware/biblioteca/bibliotecaLenguajes.middleware.js";

const bibliotecaLenguajesController = new BibliotecaLenguajesController();

export const bibliotecaLenguajesRouter = Router();

bibliotecaLenguajesRouter.get("/", bibliotecaLenguajesController.ObtenerLenguajes);

bibliotecaLenguajesRouter.get("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.ObtenerUnLenguaje);

bibliotecaLenguajesRouter.post("/", middlewareBibliotecaLenguajesCrear, bibliotecaLenguajesController.crearLenguaje);

bibliotecaLenguajesRouter.put("/:id", middlewareBibliotecaLenguajesId, middlewareBibliotecaLenguajesModificar, bibliotecaLenguajesController.modificarLenguaje);

bibliotecaLenguajesRouter.delete("/:id", middlewareBibliotecaLenguajesId, bibliotecaLenguajesController.eliminarLenguaje);
