import server from "./server";
require("./infra/database/mongo/connectDB");

const port: number = 3000;

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening at ${port} port.`)
    })
  } catch (error) {
    console.log(`Error: ${error} during server initialization.`)
  }
}

start()