import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthenticationMiddleware {

  async AuthenticateSignIn(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (this.authHeaderIsNotValid(authHeader)) {
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

  authHeaderIsNotValid(authHeader: any) {
    return !authHeader || !authHeader.startsWith('Bearer ');
  }

}

export default AuthenticationMiddleware;
