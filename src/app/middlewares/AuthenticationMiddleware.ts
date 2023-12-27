import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthenticationMiddleware {

  static async AuthenticateSignIn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.headers.authorization)
    next()
  }

}

export default AuthenticationMiddleware;
