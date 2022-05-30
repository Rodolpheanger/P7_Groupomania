"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeValidation = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const like_model_1 = require("../models/like.model");
const likeValidation = async (req, res, next) => {
    try {
        const isValid = await like_model_1.likeSchema.validate(req.body).catch((err) => {
            throw new Error(err);
        });
        if (isValid)
            next();
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.likeValidation = likeValidation;
//# sourceMappingURL=like-validation.middleware.js.map