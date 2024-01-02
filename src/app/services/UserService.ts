import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import ICreateUserPayload from '../../interfaces/ICreateUserPayload';
import ILoginUserPayload from '../../interfaces/ILoginUserPayload';
import serverConfig from '../../config/config';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async userSignUp(payload: ICreateUserPayload) {
    const result = await this.repository.create(payload);
    return result;
  }

  async userSignIn(payload: ILoginUserPayload) {
    const { email, password } = payload;
    const { success, status, message, result: user } = await this.repository.login({ email, password });

    const userId = user?._id;
    const token = jwt.sign({ userId }, serverConfig.JWT_SECRETE_KEY!);

    return { success, status, message, result: { user, token } };
  }

}

export default new UserService();
