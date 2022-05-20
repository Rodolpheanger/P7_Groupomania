"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeleteUser = exports.serviceUpdateUser = exports.serviceGetOneUser = exports.serviceGetAllUsers = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_utils_1 = require("../utils/user.utils");
const serviceGetAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlGetUsers = "SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_isadmin FROM users";
        database_1.db.query(sqlGetUsers, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};
exports.serviceGetAllUsers = serviceGetAllUsers;
const serviceGetOneUser = (req) => {
    return new Promise((resolve, reject) => {
        const sqlGetUser = `SELECT u_uid, u_username, u_email, u_firstname, u_lastname, u_bio, u_avatar_url, u_inscription_date, u_isadmin FROM users WHERE u_uid = '${req.params.id}'`;
        database_1.db.query(sqlGetUser, (err, rows) => {
            err
                ? reject(err)
                : rows.length === 0
                    ? reject("Utilisateur non trouvé")
                    : resolve(rows[0]);
        });
    });
};
exports.serviceGetOneUser = serviceGetOneUser;
// TODO: voir gestion des erreurs !!!!!!!!!!!!!!!!!!!
const serviceUpdateUser = async (req) => {
    const userUid = req.params.id;
    const { username, email, password, firstname, lastname, bio } = req.body;
    // try {
    const userExist = await (0, user_utils_1.checkIfUserExistAndGetDatas)(userUid, "u_uid");
    return !userExist
        ? false
        : userExist === req.userUid
            ? new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = await (0, password_utils_1.hashPassword)(password);
                    const sqlUpdateUser = `UPDATE users SET u_username = '${username}', u_email = '${email}', u_password = '${hashedPassword}', u_firstname = '${firstname}', u_lastname = '${lastname}', u_bio = '${bio}' WHERE u_uid = '${userUid}'`;
                    database_1.db.query(sqlUpdateUser, (err) => {
                        err ? reject(err) : resolve(true);
                    });
                }
                catch (err) {
                    console.log(err);
                    return err;
                }
            })
            : "Forbidden";
    // } catch (err) {
    //   console.log(err);
    //   return err;
    // }
};
exports.serviceUpdateUser = serviceUpdateUser;
// TODO: voir clé etrangère entre user et post HS et sur comments : REVOIR toutes les clés étrangères !!!!!!!!!!!!!!!!!!!!!!!!!!!!
const serviceDeleteUser = async (req) => {
    const userUid = req.params.id;
    try {
        const datas = await (0, user_utils_1.checkIfUserExistAndGetDatas)(userUid, "u_uid");
        const userOwner = datas.u_uid;
        const avatarUrl = datas.u_avatar_url;
        return !datas
            ? false
            : userOwner === req.userUid
                ? new Promise((resolve, reject) => {
                    (0, uploads_utils_1.deleteAvatarImgIfExist)(req, avatarUrl);
                    const sqlDeleteUser = `DELETE FROM users WHERE u_uid = '${userUid}'`;
                    database_1.db.query(sqlDeleteUser, (err) => {
                        err ? reject(err) : resolve(true);
                    });
                })
                : "Forbidden";
    }
    catch (err) {
        return err;
    }
};
exports.serviceDeleteUser = serviceDeleteUser;
//# sourceMappingURL=users.services.js.map