import { Request, Response } from "express";

class EventController {

  createEvent(
    req: Request,
    res: Response
  ) {
    res.send('Create an event');
  }

  getEvents(
    req: Request,
    res: Response
  ) {
    res.send('get an event');
  }

  getSingleEvents(
    req: Request,
    res: Response
  ) {
    res.send('get single event');
  }

  deleteEvent(
    req: Request,
    res: Response
  ) {
    res.send('delete an event');
  }

  deleteSingleEvent(
    req: Request,
    res: Response
  ) {
    res.send('delete single event');
  }


}