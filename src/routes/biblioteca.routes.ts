import { Router } from "express";
import { bibliotecaBooksRouter } from "./biblioteca/bibliotecaLibros.routes.js";
import { bibliotecaCategoriesRouter } from "./biblioteca/bibiliotecaCategorias.routes.js";
import { bibliotecaLenguajesRouter } from "./biblioteca/bibliotecaLenguajes.routes.js";

export const bibliotecaRouter = Router();

bibliotecaRouter.use("/book", bibliotecaBooksRouter);

bibliotecaRouter.use("/categories", bibliotecaCategoriesRouter);

bibliotecaRouter.use("/language", bibliotecaLenguajesRouter);
