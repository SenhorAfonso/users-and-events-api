import mongoose from 'mongoose';
import InternalServerError from '../../../app/errors/InternalServerError';
import IORM from '../../../interfaces/DataBase/IORM';

class DataBase {
  private ORM: IORM;
  private URL: string;

  constructor(ORM: IORM, URL: string) {
    this.ORM = ORM;
    this.URL = URL;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URL);
    } catch (error) {
      await mongoose.disconnect();
      throw new InternalServerError();
    }
  }
}

export default DataBase;
