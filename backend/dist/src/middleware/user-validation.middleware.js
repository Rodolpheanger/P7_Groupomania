"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidity = void 0;
const users_models_1 = require("../models/users.models");
const userValidity = async (req, res, next) => {
    const isValid = await users_models_1.userSchema.isValid(req.body);
    isValid
        ? next()
        : res.status(400).json({ message: "Format des données non valide !" });
};
exports.userValidity = userValidity;
//# sourceMappingURL=user-validation.middleware.js.map