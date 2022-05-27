"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controllers_1 = require("../controllers/comments.controllers");
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const comment_validation_middleware_1 = require("../middleware/comment-validation.middleware");
router.post("/new/:id", auth_middleware_1.default, comment_validation_middleware_1.commentValidation, comments_controllers_1.createComment);
router.get("/:id", auth_middleware_1.default, comments_controllers_1.getCommentsByPost);
router.put("/:id", auth_middleware_1.default, comment_validation_middleware_1.commentValidation, comments_controllers_1.modifyComment);
router.delete("/:id", auth_middleware_1.default, comments_controllers_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comments.routes.js.map