import express from "express";
import { userController } from "../controller/user.controller";
import { validateSchema } from "~/globals/middlewares/validate.middleware";
import { userSchemaCreate } from "../schema/user.schema";
import { asyncWrapper } from "~/globals/middlewares/error.middleware";
import { verifyUser } from "~/globals/middlewares/auth.middleware";

const userRouter = express.Router();
userRouter.post("/", validateSchema(userSchemaCreate), asyncWrapper(userController.createUser));
userRouter.get("/me", verifyUser, userController.getMe);

export default userRouter;
