import userSchema from "../schemas/userSchema";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";
import ILoginUserPayload from "../../interfaces/ILoginUserPayload";

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const result = await userSchema.create(payload);
    return result;
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