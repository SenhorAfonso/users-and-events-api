import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import eventSchema from "../../../app/schemas/eventSchema";
import userSchema from "../../../app/schemas/userSchema";
import StatusCodes from "http-status-codes";
import TestUtils from "../../../app/utils/testUtils/TestUtils";
import server from "../../../server";
import request from "supertest";
import IQueryByObjectParams from "../../../interfaces/Events/IQueryByObjectParams";
import createQueryByObject from "../../../app/utils/createQueryByObject";

let mongoServer: MongoMemoryServer;

describe("Check for deleteMany event's route http response", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
  })

  beforeEach(async () => {
    await eventSchema.collection.drop();
    await userSchema.collection.drop();
  })

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  })

  it('Should return 200 status code when the query object is valid and the user is logged in', async () => {
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
    await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 2' }, token);

    const queryObjectParams: IQueryByObjectParams = {
      dayOfWeek: 'sunday'
    }

    const queryObject = createQueryByObject(queryObjectParams);
  
    const response = await request(server)
      .delete('/api/v1/users-and-events/events/')
      .query(queryObject)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('List of deleted Events');
    expect(response.body.data).toHaveLength(2);
  })

})