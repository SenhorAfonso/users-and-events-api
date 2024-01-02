import Joi from "joi";
import ValidateUser from "../../../app/validations/User/ValidateUser";
import TestUtils from "../../../app/utils/testUtils/TestUtils";

describe('Validation payload for users sign-up route', () => {

  describe('Validate firstName field and value', () => {
    it('Should return a "firstName length must be at least 5 characters long" error', () => {
      const userPayload = {
        'firstName': 'Pedr',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"firstName" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['firstName']);

    });

    it('Should return a "firstName is required" error', () => {
      const userPayload = {
        'invalid': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"firstName" is required');
      expect(error.path).toStrictEqual(['firstName']);
    });
  });

  describe('Validate lastName field and value', () => {
    it('Should return a "lastName length must be at least 5 characters long" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afon',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"lastName" length must be at least 5 characters long');
      expect(error.path).toStrictEqual(['lastName']);

    });

    it('Should return a "lastName is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastNaame': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"lastName" is required');
      expect(error.path).toStrictEqual(['lastName']);
    });

  });

  describe('Validade birthDate field and value', () => {
    it('Should return a "birthDate must be in YYYY-MM-DD format" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023/12/27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"birthDate" must be in YYYY-MM-DD format');
      expect(error.path).toStrictEqual(['birthDate']);

    });

    it('Should return a "birthDate is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDaate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"birthDate" is required');
      expect(error.path).toStrictEqual(['birthDate']);
    });
  });

  describe('Validate city field and value', () => {
    it('Should return a "city is not allowed to be empty" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': '',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"city" is not allowed to be empty');
      expect(error.path).toStrictEqual(['city']);

    });

    it('Should return a "city is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'citya': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"city" is required');
      expect(error.path).toStrictEqual(['city']);
    });
  });

  describe('Validate county field and value', () => {
    it('Should return a "country is not allowed to be empty" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': '',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"country" is not allowed to be empty');
      expect(error.path).toStrictEqual(['country']);

    });

    it('Should return a "country is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'countrya': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"country" is required');
      expect(error.path).toStrictEqual(['country']);
    });
  });

  describe('Validate email field and value', () => {
    it('Should return a "email must be a valid email" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonsogmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"email" must be a valid email');
      expect(error.path).toStrictEqual(['email']);

    });

    it('Should return a "email is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'emaila': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"email" is required');
      expect(error.path).toStrictEqual(['email']);
    });
  });

  describe('Validate password field and value', () => {
    it('Should return an "invalid pattern" error to password less than 6 characters', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'p123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" with value "p123" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(['password']);

    });

    it('Should return a "password is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'passworda': 'password123',
        'confirmPassword': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"password" is required');
      expect(error.path).toStrictEqual(['password']);
    });
  });

  describe('Validate confirmPassword field and value', () => {
    it('Should return an "invalid pattern" error to confirmPassword less than 6 characters', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmPassword': 'p123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"confirmPassword" with value "p123" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(['confirmPassword']);

    });

    it('Should return a "confirmPassword is required" error', () => {
      const userPayload = {
        'firstName': 'Pedro',
        'lastName': 'Afonso',
        'birthDate': '2023-12-27',
        'city': 'Maringá',
        'country': 'Brasil',
        'email': 'pedroafonso@gmail.com',
        'password': 'password123',
        'confirmaPassworda': 'password123'
      };

      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error!.details[0]!;

      expect(error.message).toMatch('"confirmPassword" is required');
      expect(error.path).toStrictEqual(['confirmPassword']);
    });
  });

  describe('Validade when an extra field is sent', () => {
    it('Should return an "extra is not allowed" error to a "extra" field added in payload', () => {
      const userPayload = {
        "firstName": "Pedro",
        "lastName": "Afonso",
        "birthDate": "2023-12-27",
        "city": "Maringá",
        "country": "Brasil",
        "email": "pedroafonso@gmail.com",
        "password": "password123",
        "confirmPassword": "password123",
        "extra": "extra"
      }
  
      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error?.details[0]!;
  
      expect(error.message).toMatch('\"extra\" is not allowed');
      expect(error.path).toStrictEqual(["extra"]);
  
    });
  })

  describe('Validate when none of the fields are sent', () => {
    it('Should return an array of errors if none of the fields was sent', () => {
      const userPayload = {}
  
      const error = TestUtils.validateObject(ValidateUser.createUser(), userPayload).error?.details!;
  
      expect(error.length).toBe(8);
    });
  })

  describe('Validate when all fields are right', () => {
    it('Should return the userPayload', () => {
      const userPayload = {
        "firstName": "Pedro",
        "lastName": "Afonso",
        "birthDate": "2023-12-27",
        "city": "Maringá",
        "country": "Brasil",
        "email": "pedroafonso@gmail.com",
        "password": "password123",
        "confirmPassword": "password123"
      }
  
      const value = TestUtils.validateObject(ValidateUser.createUser(), userPayload).value;
      
      expect(value).toHaveProperty('firstName', 'Pedro');
      expect(value).toHaveProperty('lastName', 'Afonso');
      expect(value).toHaveProperty('birthDate', new Date('2023-12-27T03:00:00.000Z'));
      expect(value).toHaveProperty('city', 'Maringá');
      expect(value).toHaveProperty('country', 'Brasil');
      expect(value).toHaveProperty('email', 'pedroafonso@gmail.com');
      expect(value).toHaveProperty('password', 'password123');
      expect(value).toHaveProperty('confirmPassword', 'password123');
    });
  })
})

describe('Validation payload for users sign-in route', () => {
  describe('Validate email field and value', () => {
    it('Should return a "email must be a valid email" error', () => {
      const userPayload = {
        "email": "pedroafonsogmail.com",
        "password": "password123"
      }
  
      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error?.details[0]!;
  
      expect(error.message).toMatch('\"email\" must be a valid email');
      expect(error.path).toStrictEqual(["email"]);
  
    });
  
    it('Should return a "email is required" error', () => {
      const userPayload = {
        "emaila": "pedroafonso@gmail.com",
        "password": "password123"
      }
  
      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error?.details[0]!;
  
      expect(error.message).toMatch('\"email\" is required');
      expect(error.path).toStrictEqual(["email"]);
    })
  })

  describe('Validade password field and value', () => {
    it('Should return an "invalid pattern" error to password less than 6 characters', () => {
      const userPayload = {
        "email": "pedroafonso@gmail.com",
        "password": "p123",
      }
  
      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error?.details[0]!;
  
      expect(error.message).toMatch('\"password\" with value \"p123\" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/');
      expect(error.path).toStrictEqual(["password"]);
  
    });
  
    it('Should return a "password is required" error', () => {
      const userPayload = {
        "email": "pedroafonso@gmail.com",
        "passworda": "password123"
      }
  
      const error = TestUtils.validateObject(ValidateUser.loginUser(), userPayload).error?.details[0]!;
  
      expect(error.message).toMatch('\"password\" is required');
      expect(error.path).toStrictEqual(["password"]);
    })
  })
})