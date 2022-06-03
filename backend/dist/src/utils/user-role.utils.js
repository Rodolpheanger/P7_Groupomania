"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserRole = void 0;
const database_1 = require("../../config/database");
const checkUserRole = (requestUserUid) => {
    return new Promise((resolve, reject) => {
        const sqlCheckUserRole = `SELECT u_role FROM users WHERE u_uid ='${requestUserUid}'`;
        database_1.db.query(sqlCheckUserRole, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve(rows[0].u_role);
        });
    });
};
exports.checkUserRole = checkUserRole;
//# sourceMappingURL=user-role.utils.js.map