import userSchema from "../schemas/userSchema";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const result = await userSchema.create(payload);
    return result;
  }

  async login() {
    const result = await userSchema.find();
    return result;
  }

}

export default UserRepository;