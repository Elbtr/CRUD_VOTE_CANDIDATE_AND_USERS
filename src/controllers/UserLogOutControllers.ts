import { Request, Response } from "express";
import UserLogoutService from "../service/Users/UserLogoutService";

export default new (class UserLogOutControllers {
  logOut(req: Request, res: Response) {
    UserLogoutService.logOut(req, res);
  }
})();
