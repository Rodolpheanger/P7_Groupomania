"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = exports.addUser = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
const auth_utils_1 = require("../utils/auth.utils");
// TODO: sortir les res.status pour les mettre dans les controllers
const addUser = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await (0, password_utils_1.hashPassword)(req);
            const sqlSignUp = `
        INSERT INTO users (
          username,
          password,
          email,
          inscription_date,
          uid
          ) VALUES (
            "${req.body.username}",
            "${hashedPassword}",
            "${req.body.email}",
            NOW(),
            UUID());
          `;
            database_1.db.query(sqlSignUp, (err) => {
                err ? reject(err) : resolve(true);
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
};
exports.addUser = addUser;
const logUser = (req) => {
    return new Promise((resolve, reject) => {
        const sqlLogin = `SELECT uid, password, admin FROM users WHERE email = "${req.body.email}";`;
        database_1.db.query(sqlLogin, async (err, rows) => {
            try {
                if (err) {
                    reject(err);
                }
                else if (rows.length === 0) {
                    resolve("NoUser");
                }
                else {
                    const validPassword = await (0, password_utils_1.checkPassword)(req, rows);
                    if (!validPassword) {
                        resolve("WrongPassword");
                    }
                    else {
                        const token = (0, auth_utils_1.createToken)(rows);
                        const result = { token, uid: rows[0].uid, admin: rows[0].admin };
                        resolve(result);
                    }
                }
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    });
};
exports.logUser = logUser;
//# sourceMappingURL=sign.services.js.map