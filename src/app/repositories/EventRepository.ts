import mongoose from "mongoose";
import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import eventSchema from "../schemas/eventSchema";
import StatusCodes from "http-status-codes";
import IEventQueryParams from "../../interfaces/Events/IQueryByObjectParams";
import NotFoundError from "../errors/NotFoundError";
import InternalServerError from "../errors/InternalServerError";
import IQueryById from "../../interfaces/Events/IQueryById";
import IQueryByObject from "../../interfaces/Events/IQueryByObject";
import resultIsEmpty from "../utils/resultIsEmpty";
import BadRequestError from "../errors/BadRequestError";

class EventRepository {

  async create(payload: ICreateEventPayload) {
    const status: number = StatusCodes.OK;
    const message: string = 'Successful operation';
    const success: boolean = true;

    let result: mongoose.Document | undefined;

    try {
      result = await eventSchema.create(payload);

      return { success, status, message, result };
    } catch (error) {
      throw new InternalServerError();
    }

  }

  async getAll(queryObject: IQueryByObject) {
    const status: number = StatusCodes.OK;
    const message: string = 'Successful operation';
    const success: boolean = true;

    let { limit, page, sort, skip, ...query } = queryObject;
    let result: mongoose.Document[];

    limit = limit ?? 3;
    page = page ?? 1;
    sort = sort ?? 'asc';
    skip = (page - 1) * limit || skip || 0;

    try {
      result = await eventSchema.find(query)
        .sort({ description: sort })
        .skip(skip)
        .limit(limit);
    } catch (error) {
      throw new InternalServerError();
    }

    if (resultIsEmpty(result)) {
      throw new NotFoundError();
    }

    return { success, status, message, result };
  }

  async getSingle(queryObject: IQueryById) {
    const status: number = StatusCodes.OK;
    const message: string = 'Successful operation';
    const success: boolean = true;

    let result: mongoose.Document | null;

    try {
      result = await eventSchema.findOne(queryObject);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError();
      }
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

      if (resultIsEmpty(deletedEvents)) {
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
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new BadRequestError();
      }
      throw new InternalServerError();
    }

    if (!result) {
      throw new NotFoundError();
    }

    return { success, status, message, result };
  }

}

export default EventRepository;