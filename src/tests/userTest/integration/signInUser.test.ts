import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import userSchema from '../../../app/schemas/userSchema';
import server from '../../../server';

let mongoServer: MongoMemoryServer;

describe('Check user\'s sign-in route http responses', () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoURI = await mongoServer.getUri();

    await mongoose.connect(mongoURI);
  });

  afterAll(async () => {
    await userSchema.collection.drop();
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  it('Should return 200 status code when the payload is valid', async () => {
    const userSignUpPayload = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    await request(server)
      .post('/api/v1/users/sign-up')
      .send(userSignUpPayload);

    const userSignInPayload = {
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
    };

    const response = await request(server)
      .post('/api/v1/users/sign-in')
      .send(userSignInPayload);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('User logged in successfully');
    expect(response.body.success).toBeTruthy();

  });

  it('Should return 404 status code when the payload is not associated to a user', async () => {
    const userSignUpPayload = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    await request(server)
      .post('/api/v1/users/sign-up')
      .send(userSignUpPayload);

    const userSignInPayload = {
      'email': 'maria@gmail.com',
      'password': 'password123',
    };

    const response = await request(server)
      .post('/api/v1/users/sign-in')
      .send(userSignInPayload);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe('Not Found');
    expect(response.body.success).toBeFalsy();

  });

  it('Should return 400 status code when the payload is invalid', async () => {
    const userSignUpPayload = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    await request(server)
      .post('/api/v1/users/sign-up')
      .send(userSignUpPayload);

    const userSignInPayload = {
      'email': 'pedroafonso@gmail.com',
      'password': 'invalid',
    };

    const response = await request(server)
      .post('/api/v1/users/sign-in')
      .send(userSignInPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.success).toBeFalsy();

  });

});