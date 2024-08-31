declare namespace Express {
  export interface Request {
    currentUser: {
      id: number;
      role: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  }
}
