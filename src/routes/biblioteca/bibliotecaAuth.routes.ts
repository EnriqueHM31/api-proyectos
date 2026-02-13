import { Router } from "express";
import { bibliotecaAuthController } from "../../controllers/biblioteca/bibliotecaAuth.controller.js";
import { middlewareBibliotecaUsuarioCrear, middlewareBibliotecaUsuarioLogin } from "../../middleware/biblioteca/bibliotecaUsuarios.middleware.js";
import { middlewareAuth } from "../../middleware/biblioteca/bibliotecaAuth.middleware.js";
export const bibliotecaAuthRoutes = Router();

bibliotecaAuthRoutes.post("/iniciar-sesion", middlewareBibliotecaUsuarioLogin, bibliotecaAuthController.IniciarSesion);
bibliotecaAuthRoutes.post("/registrar-usuario", middlewareBibliotecaUsuarioCrear, bibliotecaAuthController.RegistrarUsuario);
bibliotecaAuthRoutes.get("/usuario", bibliotecaAuthController.ObtenerUsuario);
bibliotecaAuthRoutes.post("/cerrar-sesion", middlewareAuth, bibliotecaAuthController.CerrarSesion);
