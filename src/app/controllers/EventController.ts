import { Request, Response } from "express";
import eventService from "../services/EventService";
import AuthenticatedRequest from "../../interfaces/AuthMiddleware/AuthenticatedRequest";

class EventController {

  async createEvent(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const userId = req.user!.userId ?? '';
    const { description, dayOfWeek } = req.body
    const { success, status, msg, result } = await eventService.createEvent({ userId, description, dayOfWeek });
    
    res.status(status).json({ success, msg, data: result });
  }

  async getEvents(
    req: Request,
    res: Response
  ) {
    const result = await eventService.getEvents(req.query);
    res.send({ result })
  }

  async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const result = await eventService.getSingleEvents(req.query);
    res.send({ result })
  }

  async deleteMany(
    req: Request,
    res: Response
  ) {
    const result = await eventService.deleteManyEvents(req.query);
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