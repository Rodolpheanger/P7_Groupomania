"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.checkPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = (req) => {
    return bcrypt_1.default.hash(req.body.password, 10);
};
exports.hashPassword = hashPassword;
const checkPassword = (req, docs) => {
    return bcrypt_1.default.compare(req.body.password, docs[0].password);
};
exports.checkPassword = checkPassword;
const createToken = (docs) => {
    return jsonwebtoken_1.default.sign({ userId: docs[0].id }, `${process.env.JWT_SECRETKEY}`, {
        expiresIn: "24h",
    });
};
exports.createToken = createToken;
