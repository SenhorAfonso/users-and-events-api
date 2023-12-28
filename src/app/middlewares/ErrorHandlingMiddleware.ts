import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import AuthenticationError from "../errors/AuthenticationError";
import StatusCodes from "http-status-codes";

class ErrorHandlingMiddleware {

  static errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof Joi.ValidationError) {
      const { type, errors } = ErrorHandlingMiddleware.formatJoiValidationErrors(error);
      res.status(StatusCodes.BAD_REQUEST).json({ type, errors })
    } else if (error instanceof AuthenticationError) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        statusCode: StatusCodes.UNAUTHORIZED,
        error: error.name,
        message: error.message
      })
    } else {
      res.send(error.message);
    }
  }

  static formatJoiValidationErrors(error: Joi.ValidationError) {
    let type = error.name;
    let errors: Array<{
      resource: string,
      message: string
    }> = [];

    errors = error.details.map(element => ({
      resource: element.path.toString(),
      message: element.message
    }));

    return { type, errors };
  }

}

export default ErrorHandlingMiddleware;