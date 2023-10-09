import { Router } from "express";

// middleware
import { upload } from "../middleware/file-upload";
import CandidateControllers from "../controllers/CandidateControllers";

const router = Router();

router.get("/candidates", CandidateControllers.findAll);
router.post("/candidate", upload, CandidateControllers.create);
router.patch("/candidate/:id", CandidateControllers.update);
router.delete("/candidate/:id", CandidateControllers.delete);
export default router;
