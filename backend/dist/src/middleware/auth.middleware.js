"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_utils_1 = require("../utils/auth.utils");
const auth = (req, res, next) => {
    try {
        const uid = (0, auth_utils_1.getUserUid)(req);
        req.auth = uid;
        if (req.body.uid && req.body.uid !== uid) {
            throw "403 : Requête non autorisée !";
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ err: err });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.middleware.js.map