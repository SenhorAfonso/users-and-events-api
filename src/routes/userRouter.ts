import Router from 'express';

const userRouter = Router();

userRouter.post('/users/sign-up', (req, res) => {
  res.send('Signing user up');
})

userRouter.post('/users/sign-in', (req, res) => {
  res.send('Signing user in');
})

export default userRouter;
