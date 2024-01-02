import { Request, Response } from 'express';
import AuthenticatedRequest from '../../interfaces/AuthMiddleware/AuthenticatedRequest';
import eventService from '../services/EventService';

class EventController {

  static async createEvent(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const userId = req.user!.userId ?? '';
    const { description, dayOfWeek } = req.body;
    const { success, status, message, result } = await eventService.createEvent({ userId, description, dayOfWeek });

    res.status(status).json({ success, message, data: result });
  }

  static async getEvents(
    req: Request,
    res: Response
  ) {
    const {success, status, message, result } = await eventService.getEvents(req.query);

    res.status(status).json({ success, message, data: result });
  }

  static async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.getSingleEvents(req.params);

    res.status(status).json({ success, message, data: result });
  }

  static async deleteMany(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.deleteManyEvents(req.query);

    res.status(status).json({ success, message, data: result });
  }

  static async deleteSingleEvent(
    req: Request,
    res: Response
  ) {
    const { success, status, message, result } = await eventService.deleteSingleEvent(req.params);

    res.status(status).json({ success, message, data: result });
  }

}

export default EventController;