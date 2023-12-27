import server from "./server";
require("./infra/database/mongo/connectDB");

class App {
  private port: number = 3000;

  constructor() {
    this.start()
  }

  private start() {
    server.listen(this.port, () => {
      console.log(`Server is listening at ${this.port} port.`)
    })
  }

}

new App()