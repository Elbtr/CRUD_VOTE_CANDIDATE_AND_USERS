import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import UserLoginControllers from "../controllers/UserLoginControllers";
import UserLogOutControllers from "../controllers/UserLogOutControllers";
import authUser from "../middleware/auth-users";

const router = Router();

router.get("/users", authUser, UsersControllers.find);
router.post("/register", UsersControllers.create);
router.post("/login", UserLoginControllers.login);
router.post("/logout", UserLogOutControllers.logOut);

export default router;
