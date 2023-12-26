import mongoose from "mongoose"

class DataBase {
  private ORM: any;
  private URL: string;

  constructor(ORM: any, URL: string) {
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

const db = new DataBase(mongoose, 'mongodb://127.0.0.1:27017/events');
db.connect();
