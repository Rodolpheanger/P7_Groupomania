"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const errors_utils_1 = require("./../utils/errors.utils");
const post_model_1 = require("../models/post.model");
const postValidation = async (req, res, next) => {
    try {
        const isValid = await post_model_1.postSchema.validate(req.body).catch((err) => {
            throw new Error(err);
        });
        if (isValid)
            next();
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.postValidation = postValidation;
//# sourceMappingURL=post-validation.middleware.js.map