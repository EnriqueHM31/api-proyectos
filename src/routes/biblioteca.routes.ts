import { Router } from "express";
import { bibliotecaBooksRouter } from "./biblioteca/bibliotecaLibros.routes.js";
import { bibliotecaCategoriasRouter } from "./biblioteca/bibiliotecaCategorias.routes.js";
import { bibliotecaLenguajesRouter } from "./biblioteca/bibliotecaLenguajes.routes.js";

export const bibliotecaRouter = Router();

bibliotecaRouter.use("/libro", bibliotecaBooksRouter);

bibliotecaRouter.use("/categorias", bibliotecaCategoriasRouter);

bibliotecaRouter.use("/lenguaje", bibliotecaLenguajesRouter);
