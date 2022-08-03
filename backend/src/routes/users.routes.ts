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

// * Routes sign *
router.post("/signup", userValidation, signup);
router.post("/signin", userValidation, signin);

// * Route upload *
router.put("/upload", auth, uploadAvatar, setAvatar);

// * Route password *
router.put("/password", auth, updatePassword);

// * Routes users *
router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, userValidation, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
