"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = void 0;
const database_1 = require("../../config/database");
const getUserId = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetUserId = `SELECT u_id FROM users WHERE u_uid = "${req.auth}"`;
        database_1.db.query(reqGetUserId, (err, rows) => {
            err ? reject(err) : resolve(rows[0].u_id);
        });
    });
};
exports.getUserId = getUserId;
//# sourceMappingURL=user.utils.js.map