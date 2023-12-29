import userSchema from "../schemas/userSchema";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";
import ILoginUserPayload from "../../interfaces/ILoginUserPayload";
import StatusCodes from "http-status-codes";
import InternalServerError from "../errors/InternalServerError";
import resultIsEmpty from "../utils/resultIsEmpty";
import NotFoundError from "../errors/NotFoundError";

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
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'User logged in successfully';

    try {
      const user = await userSchema.findOne({ email, password });
      
      if (resultIsEmpty(user)) {
        throw new NotFoundError();
      }
      
      return { success, status, message, result: user }; 
    } catch (error) {
      throw new InternalServerError();
    }
  }

}

export default UserRepository;