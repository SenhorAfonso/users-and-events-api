import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from "mongoose"
import serverConfig from "../../../config/config"
import eventSchema from "../../../app/schemas/eventSchema";
import request from "supertest";
import userSchema from "../../../app/schemas/userSchema";
import server from "../../../server";
import StatusCodes from "http-status-codes";

let mongoServer: MongoMemoryServer;

describe("Check for create event's route http response", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = await mongoServer.getUri();

    await mongoose.connect(mongoURI);
  })
  
  afterAll(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.disconnect();
  })

  it('Should return 200 status code when the payload is valid and user is logged', async () => {
    const userSignUp = {
      "firstName": "Pedro",
      "lastName": "Afonso",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    };

    await request(server)
      .post('/api/v1/users-and-events/users/sign-up')
      .send(userSignUp);

    const { email, password } = userSignUp;

    const loggedUser = await request(server)
      .post('/api/v1/users-and-events/users/sign-in')
      .send({ email, password });

    const jwtToken = loggedUser.body.data.token!;

    const eventPayload = {
      description: 'event teste',
      dayOfWeek: 'monday'
    };

    const response = await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload)
      .auth(jwtToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.success).toBeTruthy();

  })

  it('Should return 401 status code when the payload is valid and user is not logged', async () => {
    const eventPayload = {
      description: 'event teste',
      dayOfWeek: 'monday'
    };

    const response = await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).toBe('Not Authenticated');
    expect(response.body.success).toBeFalsy();

  })

  it('Should return 400 status code when the payload is invalid and user is logged', async () => {
    const userSignUp = {
      "firstName": "Pedro",
      "lastName": "Afonso",
      "birthDate": "2023-12-27",
      "city": "Maringá",
      "country": "Brasil",
      "email": "pedroafonso@gmail.com",
      "password": "password123",
      "confirmPassword": "password123"
    };

    await request(server)
      .post('/api/v1/users-and-events/users/sign-up')
      .send(userSignUp);

    const { email, password } = userSignUp;

    const loggedUser = await request(server)
      .post('/api/v1/users-and-events/users/sign-in')
      .send({ email, password });

    const jwtToken = loggedUser.body.data.token!;

    const eventPayload = {
      description: 'invalid',
      dayOfWeek: 'invalid'
    };

    const response = await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload)
      .auth(jwtToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.type).toBe('ValidationError');
    expect(response.body.errors).toBeDefined();

  })

})