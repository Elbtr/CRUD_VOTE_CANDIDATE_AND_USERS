import { Request, Response } from "express";
import PartiesService from "../service/PartiesService";

export default new (class PartiesControllers {
  find(req: Request, res: Response) {
    PartiesService.find(req, res);
  }
  create(req: Request, res: Response) {
    PartiesService.create(req, res);
  }
})();
