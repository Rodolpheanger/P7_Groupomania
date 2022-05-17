import { userValidity } from "./../middleware/user-validation.middleware";
import express from "express";
const router = express.Router();

import { signup, signin } from "../controllers/sign.controllers";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers";
import auth from "../middleware/auth.middleware";

// sign
router.post("/signup", userValidity, signup);
router.post("/signin", userValidity, signin);

// users
router.get("/users", auth, getUsers);
router.get("/:id", auth, getUser);
router.put("/:id", auth, userValidity, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
