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

  });

  it('Should return a "firstName is required" error', () => {
    const userPayload = {
      "firstNaame": "Pedro",
      "lastName": "Afonso",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"firstName\" is required');
    expect(error.path).toStrictEqual(["firstName"]);
  })

  it('Should return a "lastName length must be at least 5 characters long" error', () => {
    const userPayload = {
      "firstName": "Pedro",
      "lastName": "Afon",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"lastName\" length must be at least 5 characters long');
    expect(error.path).toStrictEqual(["lastName"]);

  });

  it('Should return a "lastName is required" error', () => {
    const userPayload = {
      "firstName": "Pedro",
      "lastNaame": "Afonso",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"lastName\" is required');
    expect(error.path).toStrictEqual(["lastName"]);
  })
  it('Should return a "birthDate must be in YYYY-MM-DD format" error', () => {
    const userPayload = {
      "firstName": "Pedro",
      "lastName": "Afonso",
      "birthDate": "2023/12/27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"birthDate\" must be in YYYY-MM-DD format');
    expect(error.path).toStrictEqual(["birthDate"]);

  });

  it('Should return a "birthDate is required" error', () => {
    const userPayload = {
      "firstName": "Pedro",
      "lastName": "Afonso",
      "birthDaate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    }

    const error = testValidateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;

    expect(error.message).toMatch('\"birthDate\" is required');
    expect(error.path).toStrictEqual(["birthDate"]);
  })

})