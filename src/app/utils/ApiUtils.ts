import bcrypt from 'bcryptjs';
import IQueryById from '../../interfaces/Events/IQueryById';
import IQueryByIdParams from '../../interfaces/Events/IQueryByIdParams';
import IQueryByObject from '../../interfaces/Events/IQueryByObject';
import IQueryByObjectParams from '../../interfaces/Events/IQueryByObjectParams';

class APIUtils {

  static createQueryById = (payload: IQueryByIdParams) => {
    const queryObject: IQueryById = {};

    if (payload.id) {
      queryObject._id = payload.id;
    }

    return queryObject;
  };

  static createQueryByObject = (payload: IQueryByObjectParams) => {
    const queryObject: IQueryByObject = {};

    if (payload.dayOfWeek) {
      queryObject.dayOfWeek = payload.dayOfWeek;
    }

    if (payload.description) {
      queryObject.description = payload.description;
    }

    if (payload.limit) {
      queryObject.limit = payload.limit;
    }

    if (payload.page) {
      queryObject.page = payload.page;
    }

    if (payload.sort) {
      queryObject.sort = payload.sort;
    }

    if (payload.skip) {
      queryObject.skip = payload.skip;
    }

    return queryObject;
  };

  static resultIsEmpty = (target: any[] | any) => {
    if (Array.isArray(target)) {
      return target.length === 0;
    }
    return target === null || target === undefined;

  };

  static checkHashPassword(password: string, hashPassword: string) {
    const check = bcrypt.compareSync(password, hashPassword);

    return !check;
  }

  static passwordsMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }

}

export default APIUtils;