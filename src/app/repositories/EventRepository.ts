import mongoose from "mongoose";
import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import eventSchema from "../schemas/eventSchema";
import StatusCodes from "http-status-codes";
import IEventQueryParams from "../../interfaces/Events/IQueryByObjectParams";
import NotFoundError from "../errors/NotFoundError";
import InternalServerError from "../errors/InternalServerError";
import IQueryById from "../../interfaces/Events/IQueryById";
import IQueryByObject from "../../interfaces/Events/IQueryByObject";

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

  async getAll(queryObject: IQueryByObject) {
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

  async getSingle(queryObject: IQueryById) {
    const status: number = StatusCodes.OK;
    const message: string = 'Successful operation';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await eventSchema.findOne(queryObject);
    } catch (error) {
      throw new InternalServerError();
    }

    if (!result) {
      throw new NotFoundError();
    }

    return { success, status, message, result };
  }

  async deleteMany(queryObject: IQueryByObject) {
    const status: number = StatusCodes.OK;
    const message: string = 'List of deleted Events';
    const success: boolean = true;

    let deletedEvents: mongoose.Document[] = [];

    try {
      deletedEvents = await eventSchema.find(queryObject);

      if (deletedEvents.length === 0 ) {
        throw new NotFoundError();
      }

      await eventSchema.deleteMany(queryObject);
    } catch (error) {
      new InternalServerError();
    }

    return { success, status, message, result: deletedEvents };
  }

  async deleteSingle(queryObject: IQueryById) {
    const status: number = StatusCodes.NO_CONTENT;
    const message: string = 'Event deleted';
    const success: boolean = true;

    let result: mongoose.ModifyResult<Document> | null;

    try {
      result = await eventSchema.findByIdAndDelete(queryObject);

      if (!result) {
        throw new NotFoundError();
      }
      
      return { success, status, message, result };
    } catch (error) {
      throw new InternalServerError();
    }
  }

}

export default EventRepository;