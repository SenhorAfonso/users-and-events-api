import mongoose from "mongoose"
import IORM from "../../../interfaces/IORM";
import serverConfig from "../../../config/config";

class DataBase {
  private ORM: IORM;
  private URL: string;

  constructor(ORM: IORM, URL: string) {
    this.ORM = ORM;
    this.URL = URL;
  }

  connect() {
    this.ORM.connect(this.URL)
      .then(() => {
        console.log('Database connected!')
      })
      .catch((error) => {
        throw new Error(`Error (${error}) during database connection!`);
      })
  }

}

const db = new DataBase(mongoose, serverConfig.MONGO_URI!);
db.connect();
