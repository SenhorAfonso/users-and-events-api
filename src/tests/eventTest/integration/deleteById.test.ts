import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { mongo } from "mongoose";
import eventSchema from "../../../app/schemas/eventSchema";
import userSchema from "../../../app/schemas/userSchema";
import serverConfig from "../../../config/config";
import { StatusCodes } from "http-status-codes";
import TestUtils from "../../../app/utils/testUtils/TestUtils";
import server from "../../../server";
import request from "supertest";

let mongoServer: MongoMemoryServer;

describe("Check for getAll event's route http response", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = mongoServer.getUri();

    await mongoose.connect(mongoURI);
  })

  afterAll(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.disconnect();
  })

  describe("check for deleteById's route http response ", () => {

    it('Should return 204 when the id is provid and the user is logged', async () => {
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
      const eventId = await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
    
      const response = await request(server)
        .delete(`/api/v1/users-and-events/events/${eventId}`)
        .auth(token, { type: 'bearer' });

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
      expect(response.body).toEqual({});
    })

    it('Should return 400 when the id provide is invalid and the user is logged', async () => {
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
      const eventId = 'invalid'
    
      const response = await request(server)
        .delete(`/api/v1/users-and-events/events/${eventId}`)
        .auth(token, { type: 'bearer' });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.message).toBe('Invalid Input');
      
    })

    it('Should return 401 when the id provide is valid and the user is not logged', async () => {
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
      const eventId = 'invalid'
    
      const response = await request(server)
        .delete(`/api/v1/users-and-events/events/${eventId}`)

      expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body.error).toBe('Unauthorized');
      expect(response.body.message).toBe('Not Authenticated');
      
    })

    it('Should return 404 when the id provide is valid but not registred', async () => {
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
      const eventId = '658f28878a2be8dca4627463'
    
      const response = await request(server)
        .delete(`/api/v1/users-and-events/events/${eventId}`)
        .auth(token, { type: 'bearer' });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toBe('Not Found');
      
    })

  })

})