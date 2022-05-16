"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const users_services_1 = require("./users.services");
const getUsers = async (_req, res) => {
    try {
        const data = await (0, users_services_1.reqGetUsers)();
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const data = await (0, users_services_1.reqGetUser)(req);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.getUser = getUser;
// res.status(404).json({ message: "Utilisateur non trouvé" });
const updateUser = async (req, res) => {
    try {
        const result = await (0, users_services_1.reqUpdateUser)(req);
        result
            ? res.status(200).json({ message: "Profil mis à jour avec succès" })
            : res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const result = await (0, users_services_1.reqDeleteUser)(req);
        result === true
            ? res.status(200).json({
                message: "Utilisateur supprimé avec succès",
            })
            : result === false
                ? res.status(404).json({ message: "Utilisateur non trouvé" })
                : res.status(403).json({ message: "Requête non autorisée" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controllers.js.map