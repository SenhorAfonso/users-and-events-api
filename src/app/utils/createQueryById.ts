import IQueryById from "../../interfaces/Events/IQueryById";
import IQueryByIdParams from "../../interfaces/Events/IQueryByIdParams";

const createQueryById = (payload: IQueryByIdParams) => {
  const queryObject: IQueryById = {};

  if (payload.id) {
    queryObject._id = payload.id;
  }

  return queryObject;
}

export default createQueryById;