"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqDeleteUser = exports.reqUpdateUser = exports.reqGetUser = exports.reqGetUsers = void 0;
const database_1 = require("../../config/database");
const utils_controllers_1 = require("./utils.controllers");
const reqGetUsers = (req, res) => {
    const sqlGetUsers = "SELECT username, email, firstname, lastname, inscription_date FROM users";
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
exports.reqGetUsers = reqGetUsers;
const reqGetUser = (req, res) => {
    const sqlGetUser = `SELECT username, email, firstname, lastname, inscription_date FROM users WHERE username = '${req.params.username}'`;
    database_1.db.query(sqlGetUser, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (docs.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            res.status(200).json(docs);
        }
    });
};
exports.reqGetUser = reqGetUser;
const reqUpdateUser = async (req, res) => {
    const sqlCheckExist = `SELECT username FROM users WHERE username ='${req.params.username}'`;
    database_1.db.query(sqlCheckExist, async (err, docs) => {
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (docs.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            const hashedPassword = await (0, utils_controllers_1.hashPassword)(req);
            const sqlUpdateUser = `UPDATE users SET username = '${req.body.username}', email = '${req.body.email}', password = '${hashedPassword}', firstname = '${req.body.firstname}', lastname = '${req.body.lastname}' WHERE username = '${req.params.username}'`;
            database_1.db.query(sqlUpdateUser, (err, docs) => {
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
    database_1.db.query(sqlCheckExist, async (err, docs) => {
        console.log(docs);
        if (err) {
            console.log(err);
            res.status(400).json({ err });
        }
        else if (docs.length === 0) {
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
                    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
                }
            });
        }
    });
};
exports.reqDeleteUser = reqDeleteUser;
