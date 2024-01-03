import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import userSchema from '../schemas/userSchema';
import ICreateUserPayload from '../../interfaces/User/ICreateUserPayload';
import ILoginUserPayload from '../../interfaces/User/ILoginUserPayload';
import APIUtils from '../utils/ApiUtils';
import NotFoundError from '../errors/NotFoundError';
import DuplicatedValueError from '../errors/DuplicatedValueError';
import BadRequestError from '../errors/BadRequestError';

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;
    const message: string = 'User created';

    let result: mongoose.Document | null = null;

    try {
      result = await userSchema.create(payload);
    } catch (error) {
      throw new DuplicatedValueError('Email already exists');
    }
    return { success, status, message, result };

  }

  async login(payload: ILoginUserPayload) {
    const { email, password } = payload;
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'User logged in successfully';

    const user = await userSchema.findOne({ email });

    if (APIUtils.resultIsEmpty(user)) {
      throw new NotFoundError();
    }

    const signedUpPass = user!.password!;
    const passwordIsInvalid = APIUtils.checkPassword(password, signedUpPass);

    if (passwordIsInvalid) {
      throw new BadRequestError();
    }

    return { success, status, message, result: user };
  }

}

export default UserRepository;