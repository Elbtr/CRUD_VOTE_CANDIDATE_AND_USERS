import { Router, request } from "express";
import VoteControllers from "../controllers/VoteControllers";
import authUser from "../middleware/auth-users";

const router = Router();

router.post("/vote", authUser, VoteControllers.create);
router.get("/votes", authUser, VoteControllers.find);

export default router;
