"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserUid = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (u_uid, u_role) => {
    const payload = {
        userUid: u_uid,
        userRole: u_role,
    };
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRETKEY}`, {
        expiresIn: "24h",
    });
};
exports.createToken = createToken;
const decodeToken = (token) => {
    const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRETKEY}`);
    return decodedToken;
};
const getUserUid = (token) => {
    const decodedToken = decodeToken(token);
    const userUid = decodedToken.userUid;
    return userUid;
};
exports.getUserUid = getUserUid;
//# sourceMappingURL=auth.utils.js.map