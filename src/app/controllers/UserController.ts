import { Request, Response } from "express";
import userService from "../services/UserService";

class UserController {

  async userSignUp(req: Request, res: Response) {
    const { success, status, message, result } = await userService.userSignUp(req.body);

    res.status(status).json({ success, message, data: result });
  }

  async userSignIn(req: Request, res: Response) {
    const { success, status, message, result } = await userService.userSignIn(req.body);
    res.status(status).json({ success, message, data: result })
  }

}

export default new UserController();
