import { Request, Response } from "express";
import UserLoginService from "../service/Users/UserLoginService";

export default new (class UserLoginControllers {
  login(req: Request, res: Response) {
    UserLoginService.login(req, res);
  }
})();
