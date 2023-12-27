import Router from 'express';

const eventRouter = Router();

eventRouter.post('/events', (req, res) => {
  res.send('Create an event');
})

eventRouter.get('/events', (req, res) => {
  res.send('Get all events');
})

eventRouter.get('/event/:id', (req, res) => {
  res.send('Get an event from a especific id');
})

eventRouter.delete('/events', (req, res) => {
  res.send('Deletes events from especific day of week');
})

eventRouter.delete('/events/:id', (req, res) => {
  res.send('Deletes an event from a especific id');
})


export default eventRouter;