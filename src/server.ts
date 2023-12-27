import express from 'express';
import userRouter from './routes/userRouter';

class Server {
  public server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use('/api/v1/users-and-events/', userRouter)
  }
}

export default new Server().server
