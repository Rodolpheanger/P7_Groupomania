import express from "express";
import auth from "../middleware/auth.middleware";
import { userValidation } from "./../middleware/user-validation.middleware";
import { uploadAvatar } from "./../middleware/multer.middleware";
import { setAvatar } from "../controllers/uploads.controllers";
import { signup, signin } from "../controllers/sign.controllers";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controllers/users.controllers";
const router = express.Router();

// sign
router.post("/signup", userValidation, signup);
router.post("/signin", userValidation, signin);

//upload
router.put("/upload", auth, uploadAvatar, setAvatar);

// password
router.put("/password", auth, updatePassword);

// users
router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, userValidation, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
