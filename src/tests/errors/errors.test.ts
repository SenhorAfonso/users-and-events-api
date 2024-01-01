import ApiErrors from "../../app/errors/ApiErrors";
import AuthenticationError from "../../app/errors/AuthenticationError"
import BadRequestError from "../../app/errors/BadRequestError";

describe('Check if errors status code, name and message are correct', () => {

  it('AuthenticationError should be working properly even without a argument in constructor', () => {

    try {
      throw new AuthenticationError();
    } catch (error: any) {
      expect(error).toStrictEqual(new AuthenticationError());
      expect(error.name).toBe('Unauthorized');
      expect(error.message).toBe('Not Authenticated');
    }

  })

  it('AuthenticationError should have a different message if it is passed in constructor', () => {

    try {
      throw new AuthenticationError('Different message');
    } catch (error: any) {
      expect(error).toStrictEqual(new AuthenticationError('Different message'));
      expect(error.name).toBe('Unauthorized');
      expect(error.message).toBe('Different message');
    }

  })

  it('BadRequestError should be working properly even without a argument in constructor', () => {

    try {
      throw new BadRequestError();
    } catch (error: any) {
      expect(error).toStrictEqual(new BadRequestError());
      expect(error.name).toBe('Bad Request');
      expect(error.message).toBe('Invalid Input');
    }

  })

  it('BadRequestError should have a different message if it is passed in constructor', () => {

    try {
      throw new BadRequestError('Different message');
    } catch (error: any) {
      expect(error).toStrictEqual(new BadRequestError('Different message'));
      expect(error.name).toBe('Bad Request');
      expect(error.message).toBe('Different message');
    }

  })

})