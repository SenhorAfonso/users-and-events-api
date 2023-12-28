import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import EventRepository from "../repositories/EventRepository";
import IEventQueryParams from "../../interfaces/Events/IEventQueryParams";

class EventService {
  private repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  async createEvent(payload: ICreateEventPayload) {
    const result = await this.repository.create(payload);
    return result;
  }

  async getEvents() {
    const result = await this.repository.getAll();
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

  async deleteSingleEvent(payload: IEventQueryParams) {
    const queryObject = this.createQueryObject(payload);

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

    return queryObject;
  }

}

export default new EventService();