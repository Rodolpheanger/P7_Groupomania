"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_validation_middleware_1 = require("./../middleware/user-validation.middleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sign_controllers_1 = require("../controllers/sign.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
// sign
router.post("/signup", user_validation_middleware_1.userValidity, sign_controllers_1.signup);
router.post("/signin", user_validation_middleware_1.userValidity, sign_controllers_1.signin);
// users
router.get("/users", auth_middleware_1.default, users_controllers_1.getUsers);
router.get("/:uid", auth_middleware_1.default, users_controllers_1.getUser);
router.put("/:uid", auth_middleware_1.default, user_validation_middleware_1.userValidity, users_controllers_1.updateUser);
router.delete("/:uid", auth_middleware_1.default, users_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map