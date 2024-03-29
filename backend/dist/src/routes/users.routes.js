"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const user_validation_middleware_1 = require("./../middleware/user-validation.middleware");
const multer_middleware_1 = require("./../middleware/multer.middleware");
const uploads_controllers_1 = require("../controllers/uploads.controllers");
const sign_controllers_1 = require("../controllers/sign.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
const router = express_1.default.Router();
// * Routes sign *
router.post("/signup", user_validation_middleware_1.userValidation, sign_controllers_1.signup);
router.post("/signin", user_validation_middleware_1.userValidation, sign_controllers_1.signin);
// * Route upload *
router.put("/upload", auth_middleware_1.default, multer_middleware_1.uploadAvatar, uploads_controllers_1.setAvatar);
// * Route password *
router.put("/password", auth_middleware_1.default, users_controllers_1.updatePassword);
// * Routes users *
router.get("/", auth_middleware_1.default, users_controllers_1.getUsers);
router.get("/:id", auth_middleware_1.default, users_controllers_1.getUser);
router.put("/:id", auth_middleware_1.default, user_validation_middleware_1.userValidation, users_controllers_1.updateUser);
router.delete("/:id", auth_middleware_1.default, users_controllers_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map