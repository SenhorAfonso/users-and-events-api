import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthenticationError from "../errors/AuthenticationError";

class AuthenticationMiddleware {

  static async AuthenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      throw new AuthenticationError('Not Authenticated');
    }
    
    const token = authHeader!.split(' ')[1];
    
    try {
      jwt.verify(token, 'SECRETKEY');
      next();
    } catch (error) {
      throw new AuthenticationError('Not Authenticated');
    }
    
  }

  static authHeaderIsNotValid(authHeader: string | undefined) {
    return !authHeader || !authHeader.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;
