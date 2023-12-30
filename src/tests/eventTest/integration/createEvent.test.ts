import mongoose from "mongoose"
import serverConfig from "../../../config/config"
import eventSchema from "../../../app/schemas/eventSchema";
import request from "supertest";
import userSchema from "../../../app/schemas/userSchema";
import server from "../../../server";
import StatusCodes from "http-status-codes";

describe("Check for create event's route http response", () => {

  beforeAll(async () => {
    await mongoose.connect(serverConfig.TEST_MONGO_URI!);
  })

  afterAll(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
    await mongoose.connection.close();
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

})