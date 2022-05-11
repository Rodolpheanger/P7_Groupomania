"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_utils_1 = require("../utils/auth.utils");
// TODO: finir ce bout de code
const auth = (req, res, next) => {
    try {
        const username = auth_utils_1.decodeToken.username;
        req.auth = { username };
    }
    catch { }
};
exports.default = auth;
