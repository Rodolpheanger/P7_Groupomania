"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (docs) => {
    const payload = {
        userId: docs[0].id,
        isAdmin: docs[0].admin,
    };
    return jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRETKEY}`, {
        expiresIn: "24h",
    });
};
exports.createToken = createToken;
const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
};
const decodeToken = (req) => {
    const token = getToken(req);
    jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRETKEY}`);
};
exports.decodeToken = decodeToken;
