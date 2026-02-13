import { Router } from "express";
import { bibliotecaAuthController } from "../../controllers/biblioteca/bibliotecaAuth.controller.js";
import { middlewareBibliotecaUsuarioCrear, middlewareBibliotecaUsuarioModificar, middlewareBibliotecaUsuarioId } from "../../middleware/biblioteca/bibliotecaUsuarios.middleware.js";
export const bibliotecaAuthRoutes = Router();

bibliotecaAuthRoutes.post("/iniciar-sesion", bibliotecaAuthController.IniciarSesion);
bibliotecaAuthRoutes.post("/registrar-usuario", bibliotecaAuthController.RegistrarUsuario);
bibliotecaAuthRoutes.get("/usuario", bibliotecaAuthController.ObtenerUsuario);
bibliotecaAuthRoutes.post("/cerrar-sesion", bibliotecaAuthController.CerrarSesion);
