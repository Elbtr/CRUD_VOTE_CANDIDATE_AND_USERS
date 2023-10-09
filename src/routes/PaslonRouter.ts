import PaslonControllers from "../controllers/PaslonControllers";
import { Router } from "express";

// middleware
import { upload } from "../middleware/file-upload";
import authUser from "../middleware/auth-users";

const router = Router();

router.get("/paslons", authUser, PaslonControllers.findAll);
router.post("/paslon", authUser, upload, PaslonControllers.create);
router.delete("/paslon/:id", authUser, PaslonControllers.delete);
router.patch("/paslon/:id", authUser, PaslonControllers.update);
router.post(
  "/paslon/upload-image",
  authUser,
  upload,
  PaslonControllers.uploadImage
);

export default router;
