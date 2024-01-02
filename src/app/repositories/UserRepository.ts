import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import userSchema from '../schemas/userSchema';
import ICreateUserPayload from '../../interfaces/ICreateUserPayload';
import ILoginUserPayload from '../../interfaces/ILoginUserPayload';
import InternalServerError from '../errors/InternalServerError';
import resultIsEmpty from '../utils/resultIsEmpty';
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
    
    try {
      result = await userSchema.create(payload);
      return { success, status, message, result };
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async login(payload: ILoginUserPayload) {
    const { email, password } = payload;
    const status: number = StatusCodes.OK;
    const success: boolean = true;
    const message: string = 'User logged in successfully';

    let user: mongoose.Document | null;

    try {
      user = await userSchema.findOne({ email, password });
    } catch (error) {
      throw new InternalServerError();
    }
    
    if (resultIsEmpty(user)) {
      throw new NotFoundError();
    }
    
    return { success, status, message, result: user }; 
  }

}

export default UserRepository;