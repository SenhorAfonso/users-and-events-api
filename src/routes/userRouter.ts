import Router from 'express';
import UserController from '../app/controllers/UserController';
import ValidationMiddleware from '../app/middlewares/ValidationMiddleware';

const userRouter = Router();

userRouter.post('/users/sign-up', ValidationMiddleware.validateUserPayload, UserController.userSignUp);

userRouter.post('/users/sign-in', UserController.userSignIn);

export default userRouter;
