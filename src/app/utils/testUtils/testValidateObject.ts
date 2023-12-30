import Joi from "joi";

const testValidateObject = (
  validationSchema: Joi.ObjectSchema,
  target: object
) => {
  return validationSchema.validate(target, { abortEarly: false })
}

export default testValidateObject;