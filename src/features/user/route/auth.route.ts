import express from "express";
import { validateSchema } from "~/globals/middlewares/validate.middleware";
import { loginBodySchema, userSchemaCreate } from "../schema/user.schema";
import { asyncWrapper } from "~/globals/middlewares/error.middleware";
import { authController } from "../controller/auth.controller";

const authRouter = express.Router();
authRouter.post("/register", validateSchema(userSchemaCreate), authController.registerUser);
authRouter.post("/login", validateSchema(loginBodySchema), authController.loginUser);

export default authRouter;
