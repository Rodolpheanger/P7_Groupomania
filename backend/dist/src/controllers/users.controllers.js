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
        res.status(400).json({ message: err });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const data = await (0, users_services_1.reqGetUser)(req, res);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};
exports.getUser = getUser;
// res.status(404).json({ message: "Utilisateur non trouvé" });
const updateUser = (req, res) => {
    (0, users_services_1.reqUpdateUser)(req, res);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    (0, users_services_1.reqDeleteUser)(req, res);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controllers.js.map