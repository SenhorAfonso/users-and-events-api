import serverConfig from './config/config';
import server from './server';

require('./infra/database/mongo/connectDB');

class App {
  private port: number = Number(serverConfig.PORT!);

  constructor() {
    this.start();
  }

  private start() {
    server.listen(this.port, () => {
      console.log(`Server is listening at ${this.port} port.`);
    });
  }

}

new App();