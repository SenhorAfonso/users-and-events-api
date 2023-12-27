import UserRepository from "../repositories/UserRepository";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";
import jwt from 'jsonwebtoken'

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository()
  }

  async userSignUp(payload: ICreateUserPayload) {
    const result = await this.repository.create(payload);
    const userId = result.id;

    const token = jwt.sign({ userId }, 'SECRETKEY')

    return { result, token };
  }

  async userSignIn(payload: any) {
    const result = await this.repository.login();
    return result;
  }

}

export default new UserService();
