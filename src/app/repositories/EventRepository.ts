import eventSchema from "../schemas/eventSchema";

class EventRepository {

  async create(payload: any) {
    const result = await eventSchema.create(payload);
    return result;
  }

  async getAll() {
    const result = await eventSchema.find({});
    return result;
  }

  async getSingle(payload: any) {
    const result = await eventSchema.findOne({ payload });
    return result;
  }

  async deleteBy(payload: any) {
    const result = await eventSchema.deleteMany({ payload });
    return result;
  }

  async deleteSingle(payload: any) {
    const result = await eventSchema.findByIdAndDelete({ payload });
    return result;
  }

}

export default EventRepository;