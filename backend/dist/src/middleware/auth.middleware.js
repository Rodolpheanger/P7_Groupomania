"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_utils_1 = require("../utils/auth.utils");
const errors_utils_1 = require("../utils/errors.utils");
const auth = (req, res, next) => {
    try {
        const { u_uid } = req.body;
        const userUid = (0, auth_utils_1.getUserUid)(req);
        req.userUid = userUid;
        if (u_uid && u_uid !== userUid) {
            throw Error("unauthorized");
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.default = auth;
//# sourceMappingURL=auth.middleware.js.map