import { Router } from "express";
import { bibliotecaBooksRouter } from "./biblioteca/bibliotecaBooks.routes.js";
import { bibliotecaCategoriesRouter } from "./biblioteca/bibiliotecaCategories.routes.js";

export const bibliotecaRoouter = Router();

bibliotecaBooksRouter.use("/book", bibliotecaBooksRouter);

bibliotecaBooksRouter.use("/categories", bibliotecaCategoriesRouter);
