import Joi from "joi";
import ValidateUser from "../../app/validations/User/ValidateUser";

const testValidateObject = (
  validationSchema: Joi.ObjectSchema,
  target: object
) => {
  return validationSchema.validate(target)
}

describe('Validation payload for users sign-up route', () => {

  it('Should return a "firstName length must be at least 5 characters long" error', () => {
    const userPayload = {
      "firstName": "Pedr",
      "lastName": "Afonso",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"firstName\" length must be at least 5 characters long');
    expect(error.path).toStrictEqual(["firstName"]);

  })

})