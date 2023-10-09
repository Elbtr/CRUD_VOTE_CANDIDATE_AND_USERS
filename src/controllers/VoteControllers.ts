import { Request, Response } from "express";
import VoteService from "../service/VoteService";

export default new (class VoteControllers {
  create(req: Request, res: Response) {
    VoteService.create(req, res);
  }
  find(req: Request, res: Response) {
    VoteService.findAll(req, res);
  }
})();
