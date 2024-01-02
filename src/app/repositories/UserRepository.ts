import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import userSchema from '../schemas/userSchema';
import ICreateUserPayload from '../../interfaces/ICreateUserPayload';
import ILoginUserPayload from '../../interfaces/ILoginUserPayload';
import APIUtils from '../utils/ApiUtils';
import NotFoundError from '../errors/NotFoundError';
import DuplicatedValueError from '../errors/DuplicatedValueError';

class UserRepository {

  async create(payload: ICreateUserPayload) {
    const status: number = StatusCodes.CREATED;
    const success: boolean = true;
    const message: string = 'User created';

    let result: mongoose.Document | null;

    result = await userSchema.findOne({ email: payload.email });

    if (result) {
      throw new DuplicatedValueError('Email already exists');
    }

    result = await userSchema.create(payload);
    return { success, status, message, result };

  }

  async login(payload: ILoginUserPayload) {
    const { email, password } = payload;
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'User logged in successfully';

    const user = await userSchema.findOne({ email, password });

    if (APIUtils.resultIsEmpty(user)) {
      throw new NotFoundError();
    }

    return { success, status, message, result: user };
  }

}

export default UserRepository;