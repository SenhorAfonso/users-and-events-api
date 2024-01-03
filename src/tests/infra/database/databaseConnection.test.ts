import mongoose from 'mongoose';
import InternalServerError from '../../../app/errors/InternalServerError';
import DataBase from '../../../infra/database/mongo/connectDB';

describe('The ORM should', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Connect to database if the connection string is valid', async () => {
    const db = new DataBase(mongoose, 'mongodb://127.0.0.1:27017/');
    await db.connect();

    const expectedState: number = 1;
    const actualState: number = mongoose.connection.readyState;

    expect(actualState).toBe(expectedState);
    await mongoose.connection.close();
  });

  it('Connect to database if the connection string is invalid', async () => {
    const db = new DataBase(mongoose, 'mongodb://invalid/');

    try{
      await db.connect();
    } catch(error: any) {
      const expectedState: number = 0;
      const actualState: number = mongoose.connection.readyState;

      expect(error).toBeInstanceOf(InternalServerError);
      expect(error.name).toBe('Internal Server Error');
      expect(error.message).toBe('Something went wrong');
      expect(actualState).toBe(expectedState);
    }

  }, 35000);
});