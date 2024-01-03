import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

class ValidationMiddleware {

  static validatePayload(
    joiValidationObject: Joi.ObjectSchema,
    target: 'body' | 'query' | 'params'
  ) {

    return (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {

      const { error } = joiValidationObject.validate(req[target], {
        abortEarly: false
      });

      if (error) {
        throw error;
      }

      return next();
    };

  }

}

export default ValidationMiddleware;