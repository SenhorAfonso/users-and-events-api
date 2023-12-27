import Router from 'express';
import EventController from '../app/controllers/EventController';

const eventRouter = Router();

eventRouter.post('/events', EventController.createEvent)

eventRouter.get('/events', EventController.getEvents)

eventRouter.get('/event/:id', EventController.getSingleEvents)

eventRouter.delete('/events', EventController.deleteMany)

eventRouter.delete('/events/:id', EventController.getSingleEvents)


export default eventRouter;