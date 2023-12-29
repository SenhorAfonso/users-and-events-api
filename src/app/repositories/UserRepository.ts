import userSchema from "../schemas/userSchema";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";
import ILoginUserPayload from "../../interfaces/ILoginUserPayload";
import StatusCodes from "http-status-codes";
import InternalServerError from "../errors/InternalServerError";

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;
    const message: string = 'User created';

    try {
      const result = await userSchema.create(payload);
      return { success, status, message, result };
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async login(payload: ILoginUserPayload) {
    const { email, password } = payload;
    const result = await userSchema.findOne({ email: email, password: password });

    if (result) {
      return result;
    } else {
      throw new Error('User not found!')
    }

  }

}

export default UserRepository;