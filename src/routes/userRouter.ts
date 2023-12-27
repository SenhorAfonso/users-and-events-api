import Router from 'express';
import UserController from '../app/controllers/UserController';

const userRouter = Router();

userRouter.post('/users/sign-up', UserController.userSignUp);

userRouter.post('/users/sign-in', UserController.userSignIn);

export default userRouter;
