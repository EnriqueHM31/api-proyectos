import { Router } from "express";
import { bibliotecaLibrosRouter } from "./biblioteca/bibliotecaLibros.routes.js";
import { bibliotecaCategoriasRouter } from "./biblioteca/bibiliotecaCategorias.routes.js";
import { bibliotecaLenguajesRouter } from "./biblioteca/bibliotecaLenguajes.routes.js";

export const bibliotecaRouter = Router();

bibliotecaRouter.use("/libro", bibliotecaLibrosRouter);

bibliotecaRouter.use("/categorias", bibliotecaCategoriasRouter);

bibliotecaRouter.use("/lenguaje", bibliotecaLenguajesRouter);
