import mongoose from "mongoose";
import eventSchema from "../../../app/schemas/eventSchema";
import userSchema from "../../../app/schemas/userSchema";
import serverConfig from "../../../config/config";
import request from "supertest";
import TestUtils from "../../../app/utils/testUtils/TestUtils";
import server from "../../../server";
import StatusCodes from "http-status-codes";

describe("Check for getAll event's route http response", () => {

  beforeAll(async () => {
    await mongoose.connect(serverConfig.TEST_MONGO_URI!);
  })

  afterEach(async () => {
    await userSchema.collection.drop();
    await eventSchema.collection.drop();
  })

  afterAll(async () => {
    await mongoose.connection.close();
  })

  describe('Check for getById events route http responses', () => {
  
    it('Should return 200 when the id is provid and the user is logged', async () => {
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
        .get(`/api/v1/users-and-events/event/${eventId}`)
        .auth(token, { type: 'bearer' });

      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe('Successful operation');
      expect(response.body.data.description).toBe('event 1');
      expect(response.status).toBe(StatusCodes.OK)
    })

    it('Should return 401 when the id is provid and the user is not logged', async () => {
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
        .get(`/api/v1/users-and-events/event/${eventId}`);

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
  
      const { email, password } = await TestUtils.signUpUser(userSignUp);
      const token = await TestUtils.loginUser({ email, password });
      await TestUtils.createEvent({ dayOfWeek: "sunday", description: 'event 1' }, token);
      const eventId = '658f28878a2be8dca4627463';
    
      const response = await request(server)
        .get(`/api/v1/users-and-events/event/${eventId}`)
        .auth(token, { type: 'bearer' });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.error).toBe('Not Found');
      expect(response.body.message).toBe('Not Found');
      
    })


  })

})