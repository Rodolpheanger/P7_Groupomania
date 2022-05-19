"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvatar = void 0;
const upload_services_1 = require("./upload.services");
const setAvatar = async (req, res) => {
    try {
        const result = await (0, upload_services_1.serviceSetAvatarUrl)(req);
        result === "Forbidden"
            ? res.status(403).json({ message: "Requête non autorisée" })
            : result
                ? res.status(200).json({ message: "Avatar modifié avec succès" })
                : res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.setAvatar = setAvatar;
//# sourceMappingURL=upload.controller.js.map