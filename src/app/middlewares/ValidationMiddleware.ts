import { NextFunction, Request, Response } from "express";
import ValidateUser from "../validations/User/ValidateUser";
import Joi from "joi";

class ValidationMiddleware {

  static validateUserPayload(
    joiValidationObject: Joi.ObjectSchema
  ) {

    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      
      const { error } = await joiValidationObject.validate(req.body, {
        abortEarly: false
      })
  
      if (error) {
        throw error
      }
  
      return next()
    }
   
  }

}

export default ValidationMiddleware;
