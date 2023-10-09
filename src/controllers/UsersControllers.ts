import { Request, Response } from "express";
import UsersService from "../service/UsersService";

export default new (class UsersControllers {
  create(req: Request, res: Response) {
    UsersService.create(req, res);
  }
  find(req: Request, res: Response) {
    UsersService.find(req, res);
  }
})();
