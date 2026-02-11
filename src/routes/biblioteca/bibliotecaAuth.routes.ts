import { Router } from "express";
import { bibliotecaAuthController } from "../../controllers/biblioteca/bibliotecaAuth.controller.js";

export const bibliotecaAuthRoutes = Router();

bibliotecaAuthRoutes.post("/iniciar-sesion", bibliotecaAuthController.IniciarSesion);
bibliotecaAuthRoutes.post("/registrar-usuario", bibliotecaAuthController.RegistrarUsuario);
bibliotecaAuthRoutes.get("/usuario", bibliotecaAuthController.ObtenerUsuario);
