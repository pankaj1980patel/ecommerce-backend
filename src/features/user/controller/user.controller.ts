import { NextFunction, Request, Response } from "express";
import { prisma } from "~/prisma";
import { HTTP_STATUS } from "~/globals/constants/http";
import { BadRequestException, InternalServerErrorException } from "~/globals/middlewares/error.middleware";
import { authService } from "~/services/db/auth.service";

class UserController {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, password, firstName, lastName, avatar } = req.body;
    const isEmailUnique = await authService.isUserExists(email);
    if (isEmailUnique) {
      return next(new BadRequestException("Email is already in use"));
    }
    // Insert to DB
    const newUser = await prisma.user.create({
      data: {
        avatar,
        email,
        firstName,
        lastName,
        password
      }
    });
    res.status(HTTP_STATUS.CREATED).json({
      status: true,
      data: newUser,
      message: "User has been created successfully"
    });
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    const id = req.currentUser.id;
    res.status(HTTP_STATUS.OK).json({
      status: true,
      data: await prisma.user.findUnique({ where: { id: Number(id) } }),
      message: "User has been fetched successfully"
    });
  }
}

export const userController = new UserController();
