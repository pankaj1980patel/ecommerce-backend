import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "./error.middleware";
import { authService } from "~/services/db/auth.service";
import { IAuthUser } from "~/features/user/interface/auth.interface";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    throw new UnauthorizedException("Invalid token is provided");
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verifyUser = authService.verifyUser(token);
    req.currentUser = verifyUser as IAuthUser;
    next();
  } catch (error) {
    throw new UnauthorizedException("Invalid token is provided");
  }
}

export function checkUserAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new UnauthorizedException("User is not authenticated");
  }
  next();
}
