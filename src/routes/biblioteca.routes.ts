import { Router } from "express";
import { bibliotecaBooksRouter } from "./biblioteca/bibliotecaBooks.routes.js";
import { bibliotecaCategoriesRouter } from "./biblioteca/bibiliotecaCategories.routes.js";

export const bibliotecaRouter = Router();

bibliotecaRouter.use("/book", bibliotecaBooksRouter);

bibliotecaRouter.use("/categories", bibliotecaCategoriesRouter);
