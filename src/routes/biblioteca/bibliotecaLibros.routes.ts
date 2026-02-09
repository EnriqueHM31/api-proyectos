import { Router } from "express";

import { BibliotecaLibrosController } from "../../controllers/biblioteca/bibliotecaLibros.controller.js";
import {
    middlewareBibliotecaLibrosCrear,
    middlewareBibliotecaLibrosModificar,
    middlewareBibliotecaLibrosId,
} from "../../middleware/biblioteca/bibliotecaLibros.middleware.js";

export const bibliotecaLibrosRouter = Router();

const bibliotecaLibrosController = new BibliotecaLibrosController();

bibliotecaLibrosRouter.get("/", bibliotecaLibrosController.ObtenerLibros);

bibliotecaLibrosRouter.get("/:id", middlewareBibliotecaLibrosId, bibliotecaLibrosController.ObtenerUnLibro);

bibliotecaLibrosRouter.post("/", middlewareBibliotecaLibrosCrear, bibliotecaLibrosController.crearLibro);

bibliotecaLibrosRouter.put("/:id", middlewareBibliotecaLibrosId, middlewareBibliotecaLibrosModificar, bibliotecaLibrosController.modificarLibro);

bibliotecaLibrosRouter.delete("/:id", middlewareBibliotecaLibrosId, bibliotecaLibrosController.eliminarLibro);
