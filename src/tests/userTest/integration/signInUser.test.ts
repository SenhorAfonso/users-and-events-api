import mongoose from "mongoose";
import serverConfig from "../../../config/config";
import userSchema from "../../../app/schemas/userSchema";
import request from "supertest";
import server from "../../../server";
import { StatusCodes } from "http-status-codes";

describe("Check user's sign-in route http responses", () => {

  beforeAll(async () => {
    await mongoose.connect(serverConfig.TEST_MONGO_URI!);
  })

  afterAll(async () => {
    await userSchema.collection.drop();
    await mongoose.connection.close();
  })

  it('Should return 200 status code when the payload is valid', async () => {
    const userSignUpPayload = {
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
      .send(userSignUpPayload)

    const userSignInPayload = {
      "email": "pedroafonso@gmail.com",
      "password": "password123",
    };

    const response = await request(server)
      .post('/api/v1/users-and-events/users/sign-in')
      .send(userSignInPayload);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('User logged in successfully');
    expect(response.body.success).toBeTruthy();

  })

})