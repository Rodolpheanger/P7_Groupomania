"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_models_1 = require("./../models/users.models");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sign_controllers_1 = require("../controllers/sign.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
// sign
router.post("/signup", users_models_1.userValidity, sign_controllers_1.signup);
router.post("/login", users_models_1.userValidity, sign_controllers_1.login);
// users
router.get("/users", auth_middleware_1.default, users_controllers_1.getUsers);
router.get("/:username", auth_middleware_1.default, users_controllers_1.getUser);
router.put("/:username", auth_middleware_1.default, users_models_1.userValidity, users_controllers_1.updateUser);
router.delete("/:username", auth_middleware_1.default, users_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map