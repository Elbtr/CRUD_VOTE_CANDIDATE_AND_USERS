import { Request, Response } from "express";
import CandidateService from "../service/CandidateService";

export default new (class CandidateControllers {
  findAll(req: Request, res: Response) {
    CandidateService.findAll(req, res);
  }

  create(req: Request, res: Response) {
    CandidateService.create(req, res);
  }
  update(req: Request, res: Response) {
    CandidateService.update(req, res);
  }
  delete(req: Request, res: Response) {
    CandidateService.delete(req, res);
  }
})();
