import Router from 'express';
import UserController from '../app/controllers/UserController';
import ValidationMiddleware from '../app/middlewares/ValidationMiddleware';
import ValidateUser from '../app/validations/User/ValidateUser';

const userRouter = Router();

userRouter.post('/users/sign-up', ValidationMiddleware.validateUserPayload(ValidateUser.createUser()), UserController.userSignUp);

userRouter.post('/users/sign-in', ValidationMiddleware.validateUserPayload(ValidateUser.loginUser()), UserController.userSignIn);

export default userRouter;
