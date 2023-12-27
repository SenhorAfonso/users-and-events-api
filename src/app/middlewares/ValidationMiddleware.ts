import { NextFunction, Request, Response } from "express";
import ValidateUser from "../validations/User/ValidateUser";

class ValidationMiddleware {

  static async validateUserPayload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const validator = await ValidateUser.createUser();
    const { error } = validator.validate(req.body, {
      abortEarly: false
    })

    if (error) {
      throw error
    }

    return next()
  }

}

export default ValidationMiddleware;
