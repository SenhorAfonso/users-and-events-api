import { Request, Response } from "express";
import eventService from "../services/EventService";
import AuthenticatedRequest from "../../interfaces/AuthMiddleware/AuthenticatedRequest";
import NotFoundError from "../errors/NotFoundError";
import IEventQueryParams from "../../interfaces/Events/IEventQueryParams";
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
    try {
      const { success, status, msg, result } = await eventService.getEvents(req.query);
      res.status(status).json({ success, msg, data: result });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).json({ 
          statusCode: error.status,
          error: error.name,
          message: error.message
        })
      } else {
        res.status(500).send({ error })
      }
    }
  }

  async getSingleEvents(
    req: Request,
    res: Response
  ) {
    const userId = req.params.id;

    try {
      const queryObject: IEventQueryParams = { _id: userId };
      const { success, status, message, result } = await eventService.getSingleEvents(queryObject);
      res.status(status).json({ success, message, data: result });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.status).json({
          statusCode: error.status,
          error: error.name,
          message: error.message
        })
      } else if (error instanceof InternalServerError) {
        res.status(error.status).json({
          statusCode: error.status,
          error: error.name,
          message: error.message
        })
      }
    }

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
    const result = await eventService.deleteSingleEvent(req.params);
    res.send({ result })
  }

}

export default new EventController();