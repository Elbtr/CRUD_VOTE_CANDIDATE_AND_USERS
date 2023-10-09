import { Router } from "express";
import PartiesControllers from "../controllers/PartiesControllers";
import authUser from "../middleware/auth-users";

const router = Router();

router.get("/parties", authUser, PartiesControllers.find);
router.post("/party", authUser, PartiesControllers.create);

export default router;
