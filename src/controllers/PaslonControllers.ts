import { Request, Response } from "express";
import PaslonService from "../service/PaslonService";

export default new (class PaslonControllers {
  findAll(req: Request, res: Response) {
    PaslonService.findAll(req, res);
  }
  update(req: Request, res: Response) {
    PaslonService.update(req, res);
  }
  create(req: Request, res: Response) {
    PaslonService.create(req, res);
  }
  delete(req: Request, res: Response) {
    PaslonService.delete(req, res);
  }
  uploadImage(req: Request, res: Response) {
    PaslonService.uploadImage(req, res);
  }
})();
