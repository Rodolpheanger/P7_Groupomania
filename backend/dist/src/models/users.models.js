"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const yup = __importStar(require("yup"));
exports.userSchema = yup.object().shape({
    uid: yup.string(),
    username: yup.string().max(50, "Nom d'utilisateur trop long"),
    email: yup
        .string()
        .max(150, "Email trop long")
        .email("Format email non valide"),
    password: yup
        .string()
        .min(6, "Mot de passe trop court (caractères min 8)")
        .max(50, "Mot de passe trop long (caractères max 50)"),
    firstname: yup.string().max(50, "Prénom trop long (caractères max 50)"),
    lastname: yup.string().max(50, "Nom trop long (caractères max 50)"),
    bio: yup.string().max(500, "Bio trop longue (caractères max 500)"),
    profil_picture_url: yup
        .string()
        .max(255, "Nom d'image trop long (caractères max 255)"),
    inscription_date: yup.date(),
    admin: yup.number().integer().min(0).max(1),
});
//# sourceMappingURL=users.models.js.map