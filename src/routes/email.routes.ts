import { Router } from "express";
import { EmailController } from "../controllers/email.controller.js";
import { middlewareEmail } from "../middleware/email.js";

const emailRouter = Router();

const emailController = new EmailController();

emailRouter.post("/send-email", middlewareEmail, emailController.sendEmailController);

export default emailRouter;
