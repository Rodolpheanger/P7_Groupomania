"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userErrors = void 0;
const userErrors = (err) => {
    let error = { code: 0, message: "" };
    if (err.message.includes("userNotFind")) {
        error.code = 404;
        error.message = "Utilisateur non trouvé";
    }
    if (err.message.includes("Unauthorized")) {
        (error.code = 404), (error.message = "Requête non autorisée");
    }
    return error;
};
exports.userErrors = userErrors;
//# sourceMappingURL=user-errors.utils.js.map