import userSchema from "../schemas/userSchema";

class UserRepository {

  async create() {
    const result = await userSchema.create();
    return result;
  }

  async login() {
    const result = await userSchema.find();
    return result;
  }

}

export default UserRepository;