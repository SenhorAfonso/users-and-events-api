import Router from 'express';
import EventController from '../app/controllers/EventController';
import ValidationMiddleware from '../app/middlewares/ValidationMiddleware';
import ValidateEvent from '../app/validations/Event/ValidateEvent';

const eventRouter = Router();

eventRouter.post('/events', ValidationMiddleware.validatePayload(ValidateEvent.createEvent(), 'body'), EventController.createEvent)

eventRouter.get('/events', EventController.getEvents)

eventRouter.get('/event/:id', EventController.getSingleEvents)

eventRouter.delete('/events', EventController.deleteMany)

eventRouter.delete('/events/:id', EventController.getSingleEvents)


export default eventRouter;