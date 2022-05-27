"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidation = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const comment_model_1 = require("../models/comment.model");
const commentValidation = async (req, res, next) => {
    try {
        const isValid = await comment_model_1.commentSchema.validate(req.body).catch((err) => {
            throw new Error(err);
        });
        if (isValid)
            next();
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.commentValidation = commentValidation;
//# sourceMappingURL=comment-validation.middleware.js.map