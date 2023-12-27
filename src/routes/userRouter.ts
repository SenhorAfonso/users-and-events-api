import Router from 'express';

const router = Router();

router.post('users/sign-up', (req, res) => {
  res.send('Signing user up');
})

router.post('users/sign-in', (req, res) => {
  res.send('Signing user in');
})
