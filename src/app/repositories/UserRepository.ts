import userSchema from "../schemas/userSchema";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const result = await userSchema.create(payload);
    return result;
  }

  async login(payload: any) {
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