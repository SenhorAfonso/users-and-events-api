import { Request, Response } from "express";
import eventService from "../services/EventService";

class EventController {

  async createEvent(
    req: Request,
    res: Response
  ) {
    const result = await eventService.createEvent(req.body);
    res.send({ result })
  }

  async getEvents(
    req: Request,
    res: Response
  ) {
    const result = await eventService.getEvents();
    res.send({ result })
  }

  async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const result = await eventService.getSingleEvents(req.body);
    res.send({ result })
  }

  async deleteMany(
    req: Request,
    res: Response
  ) {
    const result = await eventService.deleteManyEvents(req.body);
    res.send({ result })
  }

  async deleteSingleEvent(
    req: Request,
    res: Response
  ) {
    const result = await eventService.deleteSingleEvent(req.body);
    res.send({ result })
  }

}

export default new EventController();