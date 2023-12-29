import IQueryByObject from "../../interfaces/Events/IQueryByObject";
import IQueryByObjectParams from "../../interfaces/Events/IQueryByObjectParams";

const createQueryByObject = (payload: IQueryByObjectParams) => {
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
}

export default createQueryByObject;