import { Request, Response } from "express";
import userService from "../services/UserService";

class UserController {

  async userSignUp(req: Request, res: Response) {
    const result = userService.userSignUp('');
    res.send({ result });
  }

  async userSignIn(req: Request, res: Response) {
    const result = await userService.userSignIn('');
    res.send({ result })
  }

}

export default new UserController();
