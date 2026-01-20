import { Router } from "express";
import { EmailController } from "../controllers/email.controller.js";

const emailRouter = Router();

const emailController = new EmailController();

emailRouter.post("/send-email", emailController.sendEmailController);

export default emailRouter;