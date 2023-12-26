import server from "./server";
const port: number = 3000;

const start = (): void => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening at ${port} port.`)
    })
  } catch (error) {
    console.log(`Error: ${error} during server initialization.`)
  }
}

start()