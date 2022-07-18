"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserRole = void 0;
const database_1 = require("../../config/database");
const checkUserRole = (requestUserUid) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT u_role FROM users WHERE u_uid = ?";
        const value = [requestUserUid];
        database_1.db.execute(sql, value, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve(rows[0].u_role);
        });
    });
};
exports.checkUserRole = checkUserRole;
//# sourceMappingURL=user-role.utils.js.map