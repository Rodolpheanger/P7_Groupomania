import express from "express";
import auth from "../middleware/auth.middleware";
import { userValidity } from "./../middleware/user-validation.middleware";
import { uploadAvatar } from "./../middleware/multer.middleware";
import { setAvatar } from "../controllers/upload.controller";
import { signup, signin } from "../controllers/sign.controllers";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers";
const router = express.Router();

// sign
router.post("/signup", userValidity, signup);
router.post("/signin", userValidity, signin);

//upload
router.put("/upload", auth, uploadAvatar, setAvatar);

// users
router.get("/users", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, userValidity, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
