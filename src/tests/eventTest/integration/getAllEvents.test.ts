import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import eventSchema from "../../../app/schemas/eventSchema";
import userSchema from "../../../app/schemas/userSchema";
import serverConfig from "../../../config/config";
import request from "supertest";
import server from "../../../server";
import StatusCodes from "http-status-codes";
import IQueryByObject from "../../../interfaces/Events/IQueryByObject";
import createQueryByObject from "../../../app/utils/createQueryByObject";
import TestUtils from "../../../app/utils/testUtils/TestUtils";
import IQueryByObjectParams from "../../../interfaces/Events/IQueryByObjectParams";

let mongoServer: MongoMemoryServer;

describe("Check for getAll event's route http response", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = await mongoServer.getUri();

    await mongoose.connect(mongoURI);
  })

  afterEach(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
  })

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  })

  it('Should return 200 status code if payload is valid and user is logged', async () => {

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
      description: 'event 1',
      dayOfWeek: 'monday'
    };

    await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload)
      .auth(jwtToken, { type: 'bearer' });

    const queryObjectParams: IQueryByObject = {};
    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(jwtToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.success).toBeTruthy();
    expect(response.body.data).toHaveLength(1);

  })
  
  it('Should return 401 status code if payload is valid and user is not logged', async () => {

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
      description: 'event 1',
      dayOfWeek: 'monday'
    };

    await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload)
      .auth(jwtToken, { type: 'bearer' });

    const queryObjectParams: IQueryByObject = {};
    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    expect(response.body.message).toBe('Not Authenticated');

  })

  it('Should return 404 status code if payload is valid but there is no register in database', async () => {

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
      description: 'event 1',
      dayOfWeek: 'monday'
    };

    await request(server)
      .post('/api/v1/users-and-events/events')
      .send(eventPayload)
      .auth(jwtToken, { type: 'bearer' });

    const queryObjectParams: IQueryByObject = {
      description: 'event 2',
      dayOfWeek: 'sunday'
    };
    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(jwtToken, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.error).toBe('Not Found');
    expect(response.body.message).toBe('Not Found');
    expect(response.body.data).toBeUndefined();

  })

  it('Should return only 3 events (dayOfWeek property check)', async () => {
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

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });

    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 2' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 3' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 4' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: "monday"
    }

    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data).toHaveLength(3);

  })

  it('Should return only 1 event (description property check)', async () => {
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

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });

    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 2' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 3' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 4' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      description: "event 1"
    }

    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data).toHaveLength(1);

  })

  it('Should return only 1 event (limit property check)', async () => {
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

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });

    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 2' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 3' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 4' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: "monday",
      limit: 1
    }

    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data).toHaveLength(1);

  })

  it('Should return the last event (sort property check)', async () => {
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

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });

    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 2' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 3' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 4' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      sort: 'desc',
      limit: 1
    }

    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].description).toBe('event 4');

  })

  it('Should return the last page 1 event (page property check)', async () => {
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

    const { email, password } = await TestUtils.signUpUser(userSignUp);
    const token = await TestUtils.loginUser({ email, password });

    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 2' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 3' }, token);
    await TestUtils.createEvent({ dayOfWeek: "monday", description: 'event 4' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      page: 2
    }

    const queryObject = createQueryByObject(queryObjectParams);

    const response = await request(server)
      .get('/api/v1/users-and-events/events')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Successful operation');
    expect(response.body.data).toHaveLength(1);

  })

});