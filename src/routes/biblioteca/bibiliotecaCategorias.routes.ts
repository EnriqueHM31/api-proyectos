import { Router } from "express";

import { BibliotecaCategoriasController } from "../../controllers/biblioteca/bibliotecaCategorias.controller.js";

import {
    middlewareBibliotecaCategoriasId,
    middlewareBibliotecaCategoriasCreate,
    middlewareBibliotecaCategoriasUpdate,
} from "../../middleware/biblioteca/bibliotecaCategorias.middleware.js";

export const bibliotecaCategoriasRouter = Router();

const bibliotecaCategoriasController = new BibliotecaCategoriasController();

bibliotecaCategoriasRouter.get("/", bibliotecaCategoriasController.obtenerCategorias);

bibliotecaCategoriasRouter.get("/:id", middlewareBibliotecaCategoriasId, bibliotecaCategoriasController.ObtenerUnaCategoria);

bibliotecaCategoriasRouter.post("/", middlewareBibliotecaCategoriasCreate, bibliotecaCategoriasController.crearCategoria);

bibliotecaCategoriasRouter.put("/:id", middlewareBibliotecaCategoriasUpdate, bibliotecaCategoriasController.modificarCategoria);

bibliotecaCategoriasRouter.delete("/:id", middlewareBibliotecaCategoriasId, bibliotecaCategoriasController.eliminarCategoria);
