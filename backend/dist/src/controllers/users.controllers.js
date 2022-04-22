"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const database_1 = require("../../config/database");
const getUsers = (req, res) => {
    const sqlGetUsers = "SELECT * FROM users";
    database_1.db.query(sqlGetUsers, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else {
            res.status(200).json(docs);
        }
    });
};
exports.getUsers = getUsers;
