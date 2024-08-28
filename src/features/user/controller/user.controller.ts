import { Request, Response } from "express";
import { prisma } from "~/prisma";
import { userSchemaCreate } from "../schema/user.schema";

class UserController {
  public async createUser(req: Request, res: Response) {
    const { email, password, firstName, lastName, avatar } = req.body;
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
    res.status(201).json({
      status: true,
      data: newUser,
      message: "User has been created successfully"
    });
  }
}

export const userController = new UserController();
