"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const users_services_1 = require("./users.services");
const getUsers = (req, res) => {
    (0, users_services_1.reqGetUsers)(req, res);
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    (0, users_services_1.reqGetUser)(req, res);
};
exports.getUser = getUser;
const updateUser = (req, res) => {
    (0, users_services_1.reqUpdateUser)(req, res);
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    (0, users_services_1.reqDeleteUser)(req, res);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controllers.js.map