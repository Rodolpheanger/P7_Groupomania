"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExistAndGetDatas = exports.getUserId = void 0;
const database_1 = require("../../config/database");
const getUserId = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetUserId = `SELECT u_id FROM users WHERE u_uid = "${req.userUid}"`;
        database_1.db.query(reqGetUserId, (err, rows) => {
            console.log(rows);
            err ? reject(err) : resolve(rows[0].u_id);
        });
    });
};
exports.getUserId = getUserId;
const checkIfUserExistAndGetDatas = (data, dataType) => {
    return new Promise((resolve, reject) => {
        const sqlFindUser = `SELECT u_uid, u_avatar_url FROM users WHERE ${dataType} = '${data}'`;
        database_1.db.query(sqlFindUser, (err, rows) => {
            err
                ? reject(err)
                : rows.length === 0
                    ? reject({ error: "Utilisateur non trouvé" })
                    : resolve(rows[0]);
        });
    });
};
exports.checkIfUserExistAndGetDatas = checkIfUserExistAndGetDatas;
//# sourceMappingURL=user.utils.js.map