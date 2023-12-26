import server from "./server";
import connectDB from "./infra/database/mongo/connectDB";

const port: number = 3000;

const start = async (): Promise<void> => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is listening at ${port} port.`)
    })
  } catch (error) {
    console.log(`Error: ${error} during server initialization.`)
  }
}

start()