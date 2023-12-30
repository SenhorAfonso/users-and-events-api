import { Request, Response } from "express";
import eventService from "../services/EventService";
import AuthenticatedRequest from "../../interfaces/AuthMiddleware/AuthenticatedRequest";
import NotFoundError from "../errors/NotFoundError";
import IEventQueryParams from "../../interfaces/Events/IQueryByObjectParams";
import InternalServerError from "../errors/InternalServerError";

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
    const { success, status, msg, result } = await eventService.getEvents(req.query);
    res.status(status).json({ success, msg, data: result });
  }

  async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.getSingleEvents(req.params);
    res.status(status).json({ success, message, data: result });
  }

  async deleteMany(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.deleteManyEvents(req.query);
    res.status(status).json({ success, message, data: result });
  }

  async deleteSingleEvent(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.deleteSingleEvent(req.params);
    res.status(status).json({ success, message, data: result })
  }

}

export default new EventController();