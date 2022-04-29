import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/sign.controllers";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers";

// sign
router.post("/signup", signup);
router.post("/login", login);

// users
router.get("/users", getUsers);
router.get("/:username", getUser);
router.put("/:username", updateUser);
router.delete("/:username", deleteUser);

export default router;
