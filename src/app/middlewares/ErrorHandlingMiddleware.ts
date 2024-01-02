import { Response } from 'express';
import Joi from 'joi';
import StatusCodes from 'http-status-codes';
import ApiErrors from '../errors/ApiErrors';

class ErrorHandlingMiddleware {

  static errorHandler(
    reqError: Error,
    res: Response
  ) {

    if (reqError instanceof Joi.ValidationError) {
      const { type, errors } = ErrorHandlingMiddleware.formatJoiValidationErrors(reqError);

      return res.status(StatusCodes.BAD_REQUEST).json({ type, errors });
    }

    if (reqError instanceof ApiErrors) {
      const {
        statusCode,
        error,
        message
      } = ErrorHandlingMiddleware.createCustomErrorResponse(reqError);

      return res.status(statusCode).json({ statusCode, error, message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Something Went Wrong'
    });

  }

  static createCustomErrorResponse(error: ApiErrors) {
    return {
      statusCode: error.status,
      error: error.name,
      message: error.message
    };
  }

  static formatJoiValidationErrors(error: Joi.ValidationError) {
    const type = error.name;

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