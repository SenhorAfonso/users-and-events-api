import 'express-async-errors';
import express from 'express';
import userRouter from './routes/userRouter';
import eventRouter from './routes/eventRouter';
import ErrorHandlingMiddleware from './app/middlewares/ErrorHandlingMiddleware';

class Server {
  public server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/', userRouter);
    this.server.use('/api/v1/', eventRouter);
    this.server.use(ErrorHandlingMiddleware.errorHandler);
  }
}

export default new Server().server;
