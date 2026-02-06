import { Router } from "express";

import { BibliotecaCategoriasController } from "../../controllers/biblioteca/bibliotecaCategorias.controller.js";

import {
    middlewareBibliotecaCategoriesId,
    middlewareBibliotecaCategoriesCreate,
    middlewareBibliotecaCategoriesUpdate,
} from "../../middleware/biblioteca/bibliotecaCategorias.middleware.js";

export const bibliotecaCategoriesRouter = Router();

const bibliotecaCategoriasController = new BibliotecaCategoriasController();

bibliotecaCategoriesRouter.get("/", bibliotecaCategoriasController.obtenerCategorias);

bibliotecaCategoriesRouter.get("/:id", middlewareBibliotecaCategoriesId, bibliotecaCategoriasController.ObtenerUnaCategoria);

bibliotecaCategoriesRouter.post("/", middlewareBibliotecaCategoriesCreate, bibliotecaCategoriasController.crearCategoria);

bibliotecaCategoriesRouter.put("/:id", middlewareBibliotecaCategoriesUpdate, bibliotecaCategoriasController.modificarCategoria);

bibliotecaCategoriesRouter.delete("/:id", middlewareBibliotecaCategoriesId, bibliotecaCategoriasController.eliminarCategoria);
