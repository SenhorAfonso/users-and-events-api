import * as JoiBase from 'joi';
import * as JoiDate from '@joi/date';

const Joi: JoiBase.Root = JoiBase.extend(JoiDate.default);

const MIN_NAME_LENGHT: number = 5;

class ValidateUser {

  static createUser() {
    const createUserValidator = Joi.object({

      firstName: 
        Joi.string()
        .min(MIN_NAME_LENGHT)
        .required()
        .trim(),

      lastName: 
        Joi.string()
        .min(MIN_NAME_LENGHT)
        .required()
        .trim(),

      birthDate:
        Joi.date()
        .format('YYYY-MM-DD')
        .required(),

      city:
        Joi.string()
        .required()
        .trim(),

      country:
        Joi.string()
        .required()
        .trim(),

      email:
        Joi.string()
        .email({
          minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        })
        .required(),

      password:
        Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required(),

      confirmPassword:
        Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required()

    })

    return createUserValidator;
  }

  static loginUser() {
    const loginUserInValidator = Joi.object({
      email:
        Joi.string()
        .email({
          minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
        })
        .required(),

      password:
        Joi.string()
        .regex(/^[a-zA-Z0-9]{6,30}$/)
        .required()
    })

    return loginUserInValidator;
  }
}

export default ValidateUser;
