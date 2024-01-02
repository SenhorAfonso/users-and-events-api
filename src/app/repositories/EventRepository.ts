import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import ICreateEventPayload from '../../interfaces/Events/ICreateEventPayload';
import eventSchema from '../schemas/eventSchema';
import NotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';
import IQueryById from '../../interfaces/Events/IQueryById';
import IQueryByObject from '../../interfaces/Events/IQueryByObject';
import APIUtils from '../utils/ApiUtils';
import BadRequestError from '../errors/BadRequestError';

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

    const defaultLimit: number = 3;
    const defaultPage: number = 1;
    const defaultSkip: number = 0;

    let { limit, page, sort, skip, ...query } = queryObject;
    let result: mongoose.Document[] = [];

    limit ??= defaultLimit;
    page ??= defaultPage;
    sort ??= 'asc';
    skip = (page - defaultPage) * limit || skip || defaultSkip;

    try {
      result = await eventSchema.find(query)
        .sort({ description: sort })
        .skip(skip)
        .limit(limit);
    } catch (error) {
      throw new InternalServerError();
    }

    if (APIUtils.resultIsEmpty(result)) {
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

    deletedEvents = await eventSchema.find(queryObject);

    if (APIUtils.resultIsEmpty(deletedEvents)) {
      throw new NotFoundError();
    }

    try {
      await eventSchema.deleteMany(queryObject);
    } catch (error) {
      throw new InternalServerError();
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