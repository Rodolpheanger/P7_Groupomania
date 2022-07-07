"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_controllers_1 = require("../controllers/likes.controllers");
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const like_validation_middleware_1 = require("../middleware/like-validation.middleware");
router.get("/:id", auth_middleware_1.default, likes_controllers_1.getLikeByPost);
router.post("/:id", auth_middleware_1.default, like_validation_middleware_1.likeValidation, likes_controllers_1.setLike);
exports.default = router;
//# sourceMappingURL=likes.routes.js.map