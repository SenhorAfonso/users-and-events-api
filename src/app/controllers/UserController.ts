import { Request, Response } from "express";
import userService from "../services/UserService";

class UserController {

  async userSignUp(req: Request, res: Response) {
    const result = await userService.userSignUp(req.body);
    res.send({ result });
  }

  async userSignIn(req: Request, res: Response) {
    const result = await userService.userSignIn(req.body);
    res.send({ result })
  }

}

export default new UserController();
