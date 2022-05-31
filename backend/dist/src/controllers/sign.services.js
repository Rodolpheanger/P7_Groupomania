"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSignin = exports.serviceSignup = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
const auth_utils_1 = require("../utils/auth.utils");
const serviceSignup = (body) => {
    const { username, password, email } = body;
    return new Promise(async (resolve, reject) => {
        const hashedPassword = await (0, password_utils_1.hashPassword)(password);
        const sqlSignUp = `
        INSERT INTO users (
          u_username,
          u_password,
          u_email,
          u_inscription_date,
          u_uid
          ) VALUES (
            "${username}",
            "${hashedPassword}",
            "${email}",
            NOW(),
            UUID());
          `;
        database_1.db.query(sqlSignUp, (err) => {
            err ? (console.log(err), reject(err)) : resolve(true);
        });
    });
};
exports.serviceSignup = serviceSignup;
const serviceSignin = (body) => {
    const { email, password } = body;
    return new Promise((resolve, reject) => {
        const sqlLogin = `SELECT u_uid, u_password, u_role FROM users WHERE u_email = "${email}";`;
        database_1.db.query(sqlLogin, async (err, rows) => {
            if (err) {
                console.log(err), reject(Error("query error"));
            }
            else if (rows.length === 0) {
                reject(Error("user not found"));
            }
            else {
                const { u_password, u_uid, u_role } = rows[0];
                const validPassword = await (0, password_utils_1.checkPassword)(password, u_password);
                if (!validPassword) {
                    reject(Error("invalid password"));
                }
                else {
                    const token = (0, auth_utils_1.createToken)(u_uid, u_role);
                    const result = {
                        token,
                        userUid: u_uid,
                        useRole: u_role,
                    };
                    resolve(result);
                }
            }
        });
    });
};
exports.serviceSignin = serviceSignin;
//# sourceMappingURL=sign.services.js.map