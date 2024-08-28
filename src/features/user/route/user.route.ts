import express from "express";
import { userController } from "../controller/user.controller";
import { validateSchema } from "~/globals/middlewares/validate.middleware";
import { userSchemaCreate } from "../schema/user.schema";

const userRouter = express.Router();
userRouter.post("/", validateSchema(userSchemaCreate), userController.createUser);

export default userRouter;
