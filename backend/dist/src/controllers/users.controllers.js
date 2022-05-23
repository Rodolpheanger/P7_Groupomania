"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const users_services_1 = require("./users.services");
const getUsers = async (_req, res) => {
    try {
        const data = await (0, users_services_1.serviceGetAllUsers)();
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const data = await (0, users_services_1.serviceGetOneUser)(req);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const result = await (0, users_services_1.serviceUpdateUser)(req);
        if (result)
            res.status(200).json({ message: "Profil mis à jour avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const result = await (0, users_services_1.serviceDeleteUser)(req);
        if (result)
            res.status(200).json({
                message: "Utilisateur supprimé avec succès",
            });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controllers.js.map