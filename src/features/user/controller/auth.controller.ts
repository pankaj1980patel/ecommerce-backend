import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { authService } from "~/services/db/auth.service";

class AuthController {
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    if (await authService.isUserExists(req.body.email)) {
      return next(new BadRequestException("Email is already in use"));
    }
    // Insert to DB
    const newUserDetails = await authService.addUser(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      status: true,
      data: newUserDetails,
      message: "User has been created successfully"
    });
  }
  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });

    res.status(HTTP_STATUS.OK).json({
      status: true,
      data: user,
      message: "User has been logged in successfully"
    });
  }
}

export const authController = new AuthController();
