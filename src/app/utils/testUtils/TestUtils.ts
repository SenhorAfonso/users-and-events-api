import ICreateUserPayload from "../../../interfaces/ICreateUserPayload"
import request from "supertest"
import server from "../../../server";
import ILoginUserPayload from "../../../interfaces/ILoginUserPayload";
import ICreateEventPayload from "../../../interfaces/Events/ICreateEventPayload";
import Joi from "joi";

class TestUtils {

  static async signUpUser(payload: ICreateUserPayload){
    const { email, password } = payload;
  
    const response = await request(server)
        .post('/api/v1/users-and-events/users/sign-up')
        .send(payload);
  
    
    return { email, password };
  }

  static async loginUser(payload: ILoginUserPayload) {  
    const response = await request(server)
        .post('/api/v1/users-and-events/users/sign-in')
        .send(payload);

    const jwtToken = response.body.data.token!;

    return jwtToken;
  }

  static async createEvent(payload: object, token: string) {
    const reponse = await request(server)
      .post('/api/v1/users-and-events/events')
      .send(payload)
      .auth(token, { type: 'bearer' }); 

    const eventId = reponse.body.data._id;

    return eventId;

  }

  static validateObject(
    validationSchema: Joi.ObjectSchema,
    target: object
  ) {
    return validationSchema.validate(target, { abortEarly: false })
  }

}

export default TestUtils;