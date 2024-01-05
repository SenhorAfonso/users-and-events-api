import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import StatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import server from '../../../server';
import userSchema from '../../../app/schemas/userSchema';

let mongoServer: MongoMemoryServer;

describe('Check user\'s sign-up route http responses', () => {

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

  it('Should return 201 when the payload is valid', async () => {
    const userPayload = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password123',
      'confirmPassword': 'password123'
    };

    const response = await request(server)
      .post('/api/v1/users/sign-up')
      .send(userPayload);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('User created');

  });

  it('Should return 400 when the email sent is already in use', async () => {
    const userPayload = {
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
      .send(userPayload);

    const response = await request(server)
      .post('/api/v1/users/sign-up')
      .send(userPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBe('Email already exists');

  });

  it('Should return 400 when the passwords dont match', async () => {
    const userPayload = {
      'firstName': 'Pedro',
      'lastName': 'Afonso',
      'birthDate': '2023-12-27',
      'city': 'Maringá',
      'country': 'Brasil',
      'email': 'pedroafonso@gmail.com',
      'password': 'password',
      'confirmPassword': 'password123'
    };

    const response = await request(server)
      .post('/api/v1/users/sign-up')
      .send(userPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('The passwords dont match');

  });

  it('Should return 400 when the payload is invalid', async () => {
    const userPayload = {
      'firstName': 'inv',
      'lastName': 'inv',
      'birthDate': 'invalid',
      'city': '',
      'country': '',
      'email': 'invalid',
      'password': 'inv',
      'confirmPassword': 'inv'
    };

    const response = await request(server)
      .post('/api/v1/users/sign-up')
      .send(userPayload);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.type).toBe('ValidationError');
    expect(response.body.success).toBeFalsy();

  });

});
