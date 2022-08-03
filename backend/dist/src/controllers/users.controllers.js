"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.updatePassword = exports.getUser = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const users_services_1 = require("./users.services");
// * INFO: non utilisé
// export const getUsers = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     const data = await serviceGetAllUsers();
//     if (data) res.status(200).json(data);
//   } catch (err) {
//     errorResponse(err, res);
//   }
// };
const getUser = async (req, res) => {
    const file = req.file;
    const userUid = req.params.id;
    try {
        const data = await (0, users_services_1.serviceGetOneUser)(file, userUid);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getUser = getUser;
const updatePassword = async (req, res) => {
    const file = req.file;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const requestUserUid = req.requestUserUid;
    try {
        const result = await (0, users_services_1.serviceUpdatePassword)(file, requestUserUid, oldPassword, newPassword, confirmPassword);
        if (result)
            res.status(200).json({ message: "Mot de passe modifié avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.updatePassword = updatePassword;
const updateUser = async (req, res) => {
    const file = req.file;
    const userToModifyUid = req.params.id;
    const requestUserUid = req.requestUserUid;
    const { username, email, firstname, lastname, bio } = req.body;
    try {
        const result = await (0, users_services_1.serviceUpdateUser)(file, userToModifyUid, requestUserUid, username, email, firstname, lastname, bio);
        if (result)
            res.status(200).json({ message: "Profil mis à jour avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const file = req.file;
    const userToDeleteUid = req.params.id;
    const requestUserUid = req.requestUserUid;
    try {
        const result = await (0, users_services_1.serviceDeleteUser)(file, userToDeleteUid, requestUserUid);
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