export interface IAuthRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}
export interface IAuthUser extends Omit<IAuthRegister, "password"> {
  id: number;
  role: string;
}
export interface IAuthLogin {
  email: string;
  password: string;
}
