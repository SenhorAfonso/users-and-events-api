
import UserRepository from "../repositories/UserRepository";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository()
  }

  async userSignUp(payload: any) {
    const result = await this.repository.create();
    return result;
  }

  async userSignIn(payload: any) {
    const result = await this.repository.login();
    return result;
  }

}

export default new UserService();
exports = { UserService }
