import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import eventSchema from '../../../app/schemas/eventSchema';
import userSchema from '../../../app/schemas/userSchema';
import TestUtils from '../../../app/utils/testUtils/TestUtils';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Check for getById events route http responses', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  it('Should return 200 when the id is provid and the user is logged', async () => {
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
    const eventId = await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    const response = await request(server)
      .get(`/api/v1/events/${eventId}`)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data.description).toBe('event 1');
    expect(response.status).toBe(StatusCodes.OK);
  });

  it('Should return 401 when the id is provid but the user is not logged', async () => {
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
    const eventId = await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    const response = await request(server)
      .get(`/api/v1/events/${eventId}`);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.message).toBe('Not Authenticated');

  });

  it('Should return 401 when the id is provid but the token format is invalid', async () => {
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
    let token = await TestUtils.loginUser({ email, password });
    const eventId = await TestUtils.createEvent({ dayOfWeek: 'sunday', description: 'event 1' }, token);

    token = 'Bearer invalid token';
    const response = await request(server)
      .get(`/api/v1/events/${eventId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.message).toBe('Not Authenticated');

  });

  it('Should return 404 status code if id is valid but there is no register in database', async () => {
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
    const eventId = '658f28878a2be8dca4627463';

    const response = await request(server)
      .get(`/api/v1/events/${eventId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error).toBe('Not Found');
    expect(response.body.message).toBe('Not Found');

  });

  it('Should return 400 status code if id is invalid and user is logged', async () => {
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
    const eventId = 'invalid';

    const response = await request(server)
      .get(`/api/v1/events/${eventId}`)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('Invalid Input');

  });

});
