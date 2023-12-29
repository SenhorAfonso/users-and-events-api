import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import EventRepository from "../repositories/EventRepository";
import IEventQueryParams from "../../interfaces/Events/IEventQueryParams";
import NotFoundError from "../errors/NotFoundError";
import { StatusCodes } from "http-status-codes";
import IQueryById from "../../interfaces/Events/IQueryById";
import IQueryByIdParams from "../../interfaces/Events/IQueryByIdParams";

class EventService {
  private repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  async createEvent(payload: ICreateEventPayload) {
    const result = await this.repository.create(payload);
    return result;
  }

  async getEvents(payload: IEventQueryParams) {
    const queryObject = this.createQueryObject(payload);
    const result = await this.repository.getAll(queryObject);
    
    return result;
  }

  async getSingleEvents(payload: IEventQueryParams) {
    const queryObject = this.createQueryObject(payload);
    const result = await this.repository.getSingle(queryObject);
    return result;
  }

  async deleteManyEvents(payload: IEventQueryParams) {
    const queryObject = this.createQueryObject(payload);

    const result = await this.repository.deleteMany(queryObject);
    return result;
  }

  async deleteSingleEvent(payload: IQueryByIdParams) {
    const queryObject = this.createQueryById(payload);

    const result = await this.repository.deleteSingle(queryObject)
    return result;
  }

  private createQueryObject(payload: IEventQueryParams) {
    const queryObject: IEventQueryParams = {};

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

    if (payload._id) {
      queryObject._id = payload._id;
    }

    return queryObject;
  }

  private createQueryById(payload: IQueryByIdParams) {
    const queryObject: IQueryById = {};

    if (payload.id) {
      queryObject._id = payload.id;
    }

    return queryObject;
  }

}

export default new EventService();