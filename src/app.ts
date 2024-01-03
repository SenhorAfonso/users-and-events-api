import mongoose from 'mongoose';
import serverConfig from './config/config';
import server from './server';
import DataBase from './infra/database/mongo/connectDB';

class App {
  private port: number = Number(serverConfig.SERVER_PORT!);

  constructor() {
    new DataBase(mongoose, serverConfig.MONGO_URI!).connect();
    this.start();
  }

  private start() {
    server.listen(this.port, () => {
      console.info(`Server is listening at ${this.port} port.`);
    });
  }
}

new App();