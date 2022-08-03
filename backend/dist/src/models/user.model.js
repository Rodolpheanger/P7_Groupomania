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
    uid: yup.string().uuid(),
    username: yup
        .string()
        .max(50, "Nom d'utilisateur trop long (50 caractères max)"),
    email: yup
        .string()
        .max(150, "Email trop long (150 caractères max)")
        .email("Format email non valide (exemple: nom.prenom@groupomania.fr)"),
    password: yup
        .string()
        .min(6, "Mot de passe trop court (8 caractères min)")
        .max(50, "Mot de passe trop long (50 caractères max)"),
    firstname: yup
        .string()
        .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
        .max(50, "Prénom trop long (50 caractères max)"),
    lastname: yup
        .string()
        .matches(/[a-zA-Z]+/i, "Caractères alphabétiques uniquement")
        .max(50, "Nom trop long (50 caractères max)"),
    bio: yup.string().max(255, "Bio trop longue (255 caractères max)"),
    role: yup
        .string()
        .matches(/user|admin/i, "Role non autorisé")
        .min(4)
        .max(15),
});
//# sourceMappingURL=user.model.js.map