"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqDeleteUser = exports.reqUpdateUser = exports.reqGetUser = exports.reqGetUsers = void 0;
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
// TODO: sortir les res.status pour les mettre dans les controllers
const reqGetUsers = (req, res) => {
    const sqlGetUsers = "SELECT username, email, firstname, lastname, inscription_date FROM users";
    database_1.db.query(sqlGetUsers, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else {
            res.status(200).json(rows);
        }
    });
};
exports.reqGetUsers = reqGetUsers;
const reqGetUser = (req, res) => {
    const sqlGetUser = `SELECT username, email, firstname, lastname, inscription_date, bio FROM users WHERE username = '${req.params.username}'`;
    database_1.db.query(sqlGetUser, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (rows.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            res.status(200).json(rows);
        }
    });
};
exports.reqGetUser = reqGetUser;
const reqUpdateUser = async (req, res) => {
    const sqlCheckExist = `SELECT username FROM users WHERE username ='${req.params.username}'`;
    database_1.db.query(sqlCheckExist, async (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (rows.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            const hashedPassword = await (0, password_utils_1.hashPassword)(req);
            const sqlUpdateUser = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', bio = '${req.body.bio}' WHERE username = '${req.params.username}'`;
            database_1.db.query(sqlUpdateUser, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ err });
                }
                else {
                    res.status(200).json({ message: "Profil mis à jour avec succès" });
                }
            });
        }
    });
};
exports.reqUpdateUser = reqUpdateUser;
const reqDeleteUser = (req, res) => {
    const sqlCheckExist = `SELECT username FROM users WHERE username ='${req.params.username}'`;
    database_1.db.query(sqlCheckExist, async (err, rows) => {
        console.log(rows);
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (rows.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            const sqlDeleteUser = `DELETE FROM users WHERE username = '${req.params.username}'`;
            database_1.db.query(sqlDeleteUser, (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ err });
                }
                else {
                    res.status(200).json({
                        message: "Utilisateur supprimé avec succès",
                    });
                }
            });
        }
    });
};
exports.reqDeleteUser = reqDeleteUser;
//# sourceMappingURL=users.services.js.map