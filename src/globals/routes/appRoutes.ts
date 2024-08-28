import { Application } from "express";
import userRouter from "~/features/user/route/user.route";

const appRoute = (app: Application) => {
  app.use("/api/v1/users", userRouter);
};

export default appRoute;
