import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import EventRepository from "../repositories/EventRepository";
import IEventQueryParams from "../../interfaces/Events/IQueryByObjectParams";
import NotFoundError from "../errors/NotFoundError";
import { StatusCodes } from "http-status-codes";
import IQueryByIdParams from "../../interfaces/Events/IQueryByIdParams";
import IQueryByObjectParams from "../../interfaces/Events/IQueryByObjectParams";
import createQueryById from "../utils/createQueryById";
import createQueryByObject from "../utils/createQueryByObject";

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
    const queryObject = createQueryByObject(payload);
    const result = await this.repository.getAll(queryObject);
    
    return result;
  }

  async getSingleEvents(payload: IQueryByIdParams) {
    const queryObject = createQueryById(payload);
    const result = await this.repository.getSingle(queryObject);

    return result;
  }

  async deleteManyEvents(payload: IQueryByObjectParams) {
    const queryObject = createQueryByObject(payload);
    const result = await this.repository.deleteMany(queryObject);

    return result;
  }

  async deleteSingleEvent(payload: IQueryByIdParams) {
    const queryObject = createQueryById(payload);
    const result = await this.repository.deleteSingle(queryObject);

    return result;
  }

}

export default new EventService();