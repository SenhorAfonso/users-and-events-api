import { NextFunction, Request, Response } from "express";

class ErrorHandlingMiddleware {

  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error) {
      res.send('erro');
    }
  }

}

export default ErrorHandlingMiddleware;