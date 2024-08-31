import { Application } from "express";
import authRouter from "~/features/user/route/auth.route";
import userRouter from "~/features/user/route/user.route";

const appRoute = (app: Application) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
};

export default appRoute;
