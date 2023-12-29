import Router from 'express';
import EventController from '../app/controllers/EventController';
import ValidationMiddleware from '../app/middlewares/ValidationMiddleware';
import ValidateEvent from '../app/validations/Event/ValidateEvent';
import AuthMiddleware from '../app/middlewares/AuthenticationMiddleware';

const eventRouter = Router();

eventRouter.post('/events', AuthMiddleware.AuthenticateToken, ValidationMiddleware.validatePayload(ValidateEvent.createEvent(), 'body'), EventController.createEvent)

eventRouter.get('/events', [
  AuthMiddleware.AuthenticateToken,
  ValidationMiddleware.validatePayload(ValidateEvent.getAll(), 'query')
], EventController.getEvents)

eventRouter.get('/event/:id', AuthMiddleware.AuthenticateToken, EventController.getSingleEvents)

eventRouter.delete('/events', AuthMiddleware.AuthenticateToken, EventController.deleteMany)

eventRouter.delete('/events/:id', AuthMiddleware.AuthenticateToken, EventController.deleteSingleEvent)


export default eventRouter;