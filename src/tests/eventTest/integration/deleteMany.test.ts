import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import request from 'supertest';
import eventSchema from '../../../app/schemas/eventSchema';
import userSchema from '../../../app/schemas/userSchema';
import TestUtils from '../../../app/utils/testUtils/TestUtils';
import server from '../../../server';
import IQueryByObjectParams from '../../../interfaces/Events/IQueryByObjectParams';
import APIUtils from '../../../app/utils/ApiUtils';

let mongoServer: MongoMemoryServer;

describe('Check for deleteMany event\'s route http response', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
  });

  beforeEach(async () => {
    await eventSchema.collection.drop();
    await userSchema.collection.drop();
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  it('Should return 200 status code when the query object is valid and the user is logged in', async () => {
    const userSignUp = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });
    await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 2' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: 'sunday'
    };

    const queryObject = APIUtils.createQueryByObject(queryObjectParams);

    const response = await request(server)
      .delete('/api/v1/users-and-events/events/')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('List of deleted Events');
    expect(response.body.data).toHaveLength(2);
  });

  it('Should return 400 status code when the query object is invalid', async () => {
    const userSignUp = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });
    await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    const queryObject = {
      dayOfWeek: 'invalid'
    };

    const response = await request(server)
      .delete('/api/v1/users-and-events/events/')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.type).toBe('ValidationError');
    expect(response.body.errors).toBeDefined();
  });

  it('Should return 401 status code when the user is not logged in', async () => {
    const userSignUp = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });
    await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: 'sunday'
    };

    const queryObject = APIUtils.createQueryByObject(queryObjectParams);

    const response = await request(server)
      .delete('/api/v1/users-and-events/events/')
      .query(queryObject);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.message).toBe('Not Authenticated');
  });

  it('Should return 404 status code when no element is found', async () => {
    const userSignUp = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });
    await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: 'monday'
    };

    const queryObject = APIUtils.createQueryByObject(queryObjectParams);

    const response = await request(server)
      .delete('/api/v1/users-and-events/events/')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error).toBe('Not Found');
    expect(response.body.message).toBe('Not Found');
  });

});