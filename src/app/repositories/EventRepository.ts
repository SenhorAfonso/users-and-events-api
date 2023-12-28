import mongoose from "mongoose";
import ICreateEventPayload from "../../interfaces/Events/ICreateEventPayload";
import eventSchema from "../schemas/eventSchema";
import StatusCodes from "http-status-codes";
import IEventQueryParams from "../../interfaces/Events/IEventQueryParams";

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
    const result = await eventSchema.find(queryObject);
    return result;
  }

  async getSingle(payload: any) {
    const result = await eventSchema.findOne({ payload });
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