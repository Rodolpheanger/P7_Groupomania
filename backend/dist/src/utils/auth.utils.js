"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserUid = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (rows) => {
    const payload = {
        uid: rows[0].uid,
        isAdmin: rows[0].admin,
    };
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRETKEY}`, {
        expiresIn: "24h",
    });
};
exports.createToken = createToken;
const getToken = (req) => {
    const token = req.headers.authorization.split(" ")[1];
    return token;
};
const decodeToken = (req) => {
    const token = getToken(req);
    const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRETKEY}`);
    return decodedToken;
};
const getUserUid = (req) => {
    const decodedToken = decodeToken(req);
    const uid = decodedToken.uid;
    return uid;
};
exports.getUserUid = getUserUid;
//# sourceMappingURL=auth.utils.js.map