import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import EventRepository from "../repositories/EventRepository";

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

  async getSingleEvents(payload: any) {
    const result = await this.repository.getSingle(payload);
    return result;
  }

  async deleteManyEvents(payload: any) {
    const result = await this.repository.deleteMany(payload);
    return result;
  }

  async deleteSingleEvent(payload: any) {
    const result = await this.repository.deleteSingle(payload)
    return result;
  }

}

export default new EventService();