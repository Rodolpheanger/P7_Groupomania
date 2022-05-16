"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqDeleteUser = exports.reqUpdateUser = exports.reqGetUser = exports.reqGetUsers = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
// TODO: sortir les res.status pour les mettre dans les controllers
const reqGetUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlGetUsers = "SELECT uid, username, email, firstname, lastname, inscription_date FROM users";
        database_1.db.query(sqlGetUsers, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};
exports.reqGetUsers = reqGetUsers;
const reqGetUser = (req) => {
    return new Promise((resolve, reject) => {
        const sqlGetUser = `SELECT uid, username, email, firstname, lastname, inscription_date, bio FROM users WHERE uid = '${req.params.uid}'`;
        database_1.db.query(sqlGetUser, (err, rows) => {
            err
                ? reject(err)
                : rows.length === 0
                    ? reject("Utilisateur non trouvé")
                    : resolve(rows[0]);
        });
    });
};
exports.reqGetUser = reqGetUser;
const checkIfUserExist = (req) => {
    return new Promise((resolve, reject) => {
        const sqlFindUser = `SELECT uid FROM users WHERE uid = '${req.params.uid}'`;
        database_1.db.query(sqlFindUser, (err, rows) => {
            err
                ? reject(err)
                : rows.length === 0
                    ? resolve(false)
                    : resolve(rows[0].uid);
        });
    });
};
const reqUpdateUser = async (req) => {
    try {
        const userExist = await checkIfUserExist(req);
        return userExist
            ? new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = await (0, password_utils_1.hashPassword)(req);
                    const sqlUpdateUser = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', bio = '${req.body.bio}' WHERE uid = '${req.params.uid}'`;
                    database_1.db.query(sqlUpdateUser, (err) => {
                        err ? reject(err) : resolve(true);
                    });
                }
                catch (err) {
                    console.log(err);
                    return err;
                }
            })
            : false;
    }
    catch (err) {
        console.log(err);
        return err;
    }
};
exports.reqUpdateUser = reqUpdateUser;
const reqDeleteUser = async (req) => {
    try {
        const userExist = await checkIfUserExist(req);
        return !userExist
            ? false
            : userExist === req.auth
                ? new Promise((resolve, reject) => {
                    const sqlDeleteUser = `DELETE FROM users WHERE uid = '${req.params.uid}'`;
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
exports.reqDeleteUser = reqDeleteUser;
//# sourceMappingURL=users.services.js.map