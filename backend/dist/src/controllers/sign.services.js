"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = exports.addUser = void 0;
const sign_controllers_1 = require("./sign.controllers");
const database_1 = require("../../config/database");
const utils_controllers_1 = require("./utils.controllers");
const addUser = async (req, res) => {
    const hashedPassword = await (0, utils_controllers_1.hashPassword)(req);
    const sqlSignUp = `
INSERT INTO users (
  username,
  password,
  email,
  firstname,
  lastname,
  inscription_date
  ) VALUES (
    "${req.body.username}",
    "${hashedPassword}",
    "${req.body.email}",
    "${req.body.firstname}",
    "${req.body.lastname}",
    NOW());
  `;
    database_1.db.query(sqlSignUp, (err) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        else {
            (0, sign_controllers_1.login)(req, res);
        }
    });
};
exports.addUser = addUser;
const logUser = (req, res) => {
    const sqlLogin = `SELECT id, password FROM users WHERE email = "${req.body.email}";`;
    database_1.db.query(sqlLogin, async (err, docs) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        else if (docs.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            const validPassword = await (0, utils_controllers_1.checkPassword)(req, docs);
            if (!validPassword) {
                return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            else {
                const token = (0, utils_controllers_1.createToken)(docs);
                res.status(200).json({
                    token: token,
                });
            }
        }
    });
};
exports.logUser = logUser;
