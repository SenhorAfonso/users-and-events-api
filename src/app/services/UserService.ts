import UserRepository from "../repositories/UserRepository";
import ICreateUserPayload from "../../interfaces/ICreateUserPayload";
import ILoginUserPayload from "../../interfaces/ILoginUserPayload";
import jwt from 'jsonwebtoken'

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository()
  }

  async userSignUp(payload: ICreateUserPayload) {
    const result = await this.repository.create(payload);
    return { result };
  }

  async userSignIn(payload: ILoginUserPayload) {
    const { email, password } = payload;

    const result = await this.repository.login({ email, password });
    const userId = result.id;

    const token = jwt.sign({ userId }, 'SECRETKEY')

    return { result, token };
  }

}

export default new UserService();
