import Router from 'express';
import UserController from '../app/controllers/UserController';
import ValidationMiddleware from '../app/middlewares/ValidationMiddleware';
import ValidateUser from '../app/validations/User/ValidateUser';

const userRouter = Router();

userRouter.post('/users/sign-up', ValidationMiddleware.validatePayload(ValidateUser.createUser(), 'body'), UserController.userSignUp);

userRouter.post('/users/sign-in', ValidationMiddleware.validatePayload(ValidateUser.loginUser(), 'body'), UserController.userSignIn);

export default userRouter;
