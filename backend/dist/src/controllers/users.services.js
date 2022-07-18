"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeleteUser = exports.serviceUpdateUser = exports.serviceUpdatePassword = exports.serviceGetOneUser = exports.serviceGetAllUsers = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_role_utils_1 = require("../utils/user-role.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceGetAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users";
        database_1.db.query(sql, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetAllUsers = serviceGetAllUsers;
const serviceGetOneUser = async (file, userUid) => {
    const datas = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, userUid);
    const userId = datas.u_id;
    return new Promise((resolve, reject) => {
        const sql = "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_role FROM users WHERE u_id = ?";
        const value = [userId];
        database_1.db.execute(sql, value, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
        });
    });
};
exports.serviceGetOneUser = serviceGetOneUser;
const serviceUpdatePassword = async (file, requestUserUid, oldPassword, newPassword, confirmPassword) => {
    const datas = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, requestUserUid);
    const { u_id, u_password } = datas;
    const isPasswordCorrect = await (0, password_utils_1.checkPassword)(oldPassword, u_password);
    if (isPasswordCorrect && newPassword === confirmPassword) {
        const hashedNewPassword = await (0, password_utils_1.hashPassword)(newPassword);
        return new Promise((resolve, reject) => {
            const sql = "UPDATE users SET u_password = ? WHERE u_id = ?";
            const values = [hashedNewPassword, u_id];
            database_1.db.execute(sql, values, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        if (!isPasswordCorrect)
            throw Error("old");
        else if (newPassword !== confirmPassword)
            throw Error("passwords don't match");
        else
            throw Error("forbidden");
    }
};
exports.serviceUpdatePassword = serviceUpdatePassword;
const serviceUpdateUser = async (file, userToModifyUid, requestUserUid, username, email, firstname, lastname, bio) => {
    const datas = await (0, users_utils_1.checkIfUserIsUserOwner)(file, userToModifyUid);
    const { userOwner, userId } = datas;
    if (userOwner === requestUserUid) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE users SET u_username = ?, u_email = ?, u_firstname = ?, u_lastname = ?, u_bio = ? WHERE u_id = ?";
            const values = [username, email, firstname, lastname, bio, userId];
            database_1.db.execute(sql, values, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceUpdateUser = serviceUpdateUser;
const serviceDeleteUser = async (file, userToDeleteUid, requestUserUid) => {
    const datas = await (0, users_utils_1.checkIfUserIsUserOwner)(file, userToDeleteUid);
    const userRole = await (0, user_role_utils_1.checkUserRole)(requestUserUid);
    const { userOwner, userId, avatarUrl } = datas;
    if (userOwner === requestUserUid || userRole === "admin") {
        return new Promise((resolve, reject) => {
            (0, uploads_utils_1.deleteAvatarImgIfExist)(file, avatarUrl);
            const sql = "DELETE FROM users WHERE u_id = ?";
            const value = [userId];
            database_1.db.execute(sql, value, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceDeleteUser = serviceDeleteUser;
//# sourceMappingURL=users.services.js.map