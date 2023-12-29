import mongoose from "mongoose";
import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import eventSchema from "../schemas/eventSchema";
import StatusCodes from "http-status-codes";
import IEventQueryParams from "../../interfaces/Events/IEventQueryParams";
import NotFoundError from "../errors/NotFoundError";

class EventRepository {

  async create(payload: ICreateEventPayload) {
    let status: number = 0;
    let msg: string = '';
    let success: boolean = true;
    let result: mongoose.Document | undefined;

    try {
      result = await eventSchema.create(payload);

      status = StatusCodes.OK;
      msg = 'Successful operation';

      return { success, status, msg, result };
    } catch (error) {
      status = StatusCodes.INTERNAL_SERVER_ERROR;
      msg = 'Something went wrong';
      success = false

      return { success, status, msg, result };
    }
  }

  async getAll(queryObject: IEventQueryParams) {
    let status: number = 0;
    let msg: string = '';
    let success: boolean = true;
    let result: mongoose.Document[];
    let { limit, page, sort, skip, ...query } = queryObject;

    limit = limit ?? 3;
    page = page ?? 1;
    sort = sort ?? 'asc';
    skip = (page - 1) * limit || skip || 0;

    result = await eventSchema.find(query)
      .sort({ description: sort })
      .skip(skip)
      .limit(limit);

    if (result.length === 0) {
      throw new NotFoundError();
    }

    status = StatusCodes.OK;
    msg = 'Successful operation';

    return { success, status, msg, result };
  }

  async getSingle(queryObject: IEventQueryParams) {
    const { _id } = queryObject;
    const result = await eventSchema.findOne({ _id });
    
    return result;
  }

  async deleteMany(payload: any) {
    const result = await eventSchema.deleteMany({ payload });
    return result;
  }

  async deleteSingle(payload: any) {
    const result = await eventSchema.findByIdAndDelete({ payload });
    return result;
  }

}

export default EventRepository;