"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const errors_utils_1 = require("./../utils/errors.utils");
const users_models_1 = require("../models/users.models");
const userValidation = async (req, res, next) => {
    try {
        const isValid = await users_models_1.userSchema.validate(req.body).catch((err) => {
            throw new Error(err);
        });
        if (isValid)
            next();
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.userValidation = userValidation;
//# sourceMappingURL=user-validation.middleware.js.map