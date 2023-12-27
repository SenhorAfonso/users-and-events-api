import userSchema from "../schemas/userSchema";

class UserRepository {

  async create(payload: any) {
    const result = await userSchema.create(payload);
    return result;
  }

  async login() {
    const result = await userSchema.find();
    return result;
  }

}

export default UserRepository;