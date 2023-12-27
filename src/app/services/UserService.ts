import UserRepository from "../repositories/UserRepository";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository()
  }

  async userSignUp(payload: ICreateUserPayload) {
    const result = await this.repository.create(payload);
    return result;
  }

  async userSignIn(payload: any) {
    const result = await this.repository.login();
    return result;
  }

}

export default new UserService();
