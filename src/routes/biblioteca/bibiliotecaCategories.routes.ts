import { Router } from "express";

import { BibliotecaCategoriesController } from "../../controllers/biblioteca/bibliotecaCategories.controller.js";

import { middlewareBibliotecaCategoriesId, middlewareBibliotecaCategoriesCreate } from "../../middleware/biblioteca/bibliotecaCategories.middleware.js";

export const bibliotecaCategoriesRouter = Router();

const bibliotecaCategoriesController = new BibliotecaCategoriesController();

bibliotecaCategoriesRouter.get("/", bibliotecaCategoriesController.getAll);

bibliotecaCategoriesRouter.get("/:id", middlewareBibliotecaCategoriesId, bibliotecaCategoriesController.getCategories);

bibliotecaCategoriesRouter.post("/", middlewareBibliotecaCategoriesCreate, bibliotecaCategoriesController.create);

bibliotecaCategoriesRouter.put("/:id", middlewareBibliotecaCategoriesId, bibliotecaCategoriesController.update);

bibliotecaCategoriesRouter.delete("/:id", middlewareBibliotecaCategoriesId, bibliotecaCategoriesController.delete);
