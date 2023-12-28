import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthenticationError from "../errors/AuthenticationError";
import IJwtPayload from "../../interfaces/AuthMiddleware/IJwtPayload";
import AuthenticatedRequest from "../../interfaces/AuthMiddleware/AuthenticatedRequest";

class AuthenticationMiddleware {

  static async AuthenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      throw new AuthenticationError('Not Authenticated');
    }
    
    const token = authHeader!.split(' ')[1];
    
    try {
      const { userId } = jwt.verify(token, 'SECRETKEY') as IJwtPayload;
      req.user = { userId };
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
