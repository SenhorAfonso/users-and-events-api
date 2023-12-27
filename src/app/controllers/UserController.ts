import { Request, Response } from "express";

class UserController {

  async userSignUp(req: Request, res: Response) {
    res.send('Signing user up');
  }

  async userSignIn(req: Request, res: Response) {
    res.send('Signing user in');
  }

}
