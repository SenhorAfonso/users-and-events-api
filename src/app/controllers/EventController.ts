import { Request, Response } from "express";
import EventService from "../services/EventService";

class EventController {
  private service: EventService; 

  constructor() {
    this.service = new EventService();
  }

  async createEvent(
    req: Request,
    res: Response
  ) {
    const result = await this.service.createEvent(req.body);
    res.send({ result })
  }

  async getEvents(
    req: Request,
    res: Response
  ) {
    const result = await this.service.getEvents();
    res.send({ result })
  }

  async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const result = await this.service.getSingleEvents(req.body);
    res.send({ result })
  }

  async deleteMany(
    req: Request,
    res: Response
  ) {
    const result = await this.service.deleteEvent(req.body);
    res.send({ result })
  }

  async deleteSingleEvent(
    req: Request,
    res: Response
  ) {
    const result = await this.service.deleteSingleEvent(req.body);
    res.send({ result })
  }


}