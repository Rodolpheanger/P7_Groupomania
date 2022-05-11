"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (req) => {
    return bcrypt_1.default.hash(req.body.password, 10);
};
exports.hashPassword = hashPassword;
const checkPassword = (req, rows) => {
    return bcrypt_1.default.compare(req.body.password, rows[0].password);
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=password.utils.js.map