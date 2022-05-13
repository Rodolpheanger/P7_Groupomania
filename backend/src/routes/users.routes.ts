import { userValidity } from "./../models/users.models";
import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/sign.controllers";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers";
import auth from "../middleware/auth.middleware";

// sign
router.post("/signup", userValidity, signup);
router.post("/login", userValidity, login);

// users
router.get("/users", auth, getUsers);
router.get("/:username", auth, getUser);
router.put("/:username", auth, userValidity, updateUser);
router.delete("/:username", auth, deleteUser);

export default router;
