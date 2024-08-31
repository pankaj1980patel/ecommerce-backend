import { prisma } from "~/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IAuthLogin, IAuthRegister } from "~/features/user/interface/auth.interface";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
class AuthService {
  public async addUser(requestBody: IAuthRegister) {
    const { email, password, firstName, lastName, avatar } = requestBody;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        avatar,
        email,
        firstName,
        lastName,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true
        // Do not select 'password'
      }
    });
    const payload = { id: newUser.id, email, firstName, lastName, avatar, role: newUser.role };
    const accessToken = this.generateJwt(payload);
    return { user: newUser, accessToken };
  }
  public async login(requestBody: IAuthLogin) {
    const { email, password } = requestBody;
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid email or password");
    }
    const payload = {
      id: user.id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      role: user.role
    };
    const accessToken = this.generateJwt(payload);
    return { user, accessToken };
  }
  public async isUserExists(email: string) {
    const userByEmail = await prisma.user.findFirst({ where: { email } });
    return !!userByEmail;
  }
  private generateJwt(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  }
  private getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
  public verifyUser(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

export const authService = new AuthService();
