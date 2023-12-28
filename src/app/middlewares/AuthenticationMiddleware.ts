import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthenticationMiddleware {

  static async AuthenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (AuthenticationMiddleware.authHeaderIsNotValid(authHeader)) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    
    const token = authHeader!.split(' ')[1];
    
    try {
      jwt.verify(token, 'SECRETKEY');
      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    
  }

  static authHeaderIsNotValid(authHeader: string | undefined) {
    return !authHeader || !authHeader.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;
