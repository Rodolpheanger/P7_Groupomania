"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = exports.addUser = void 0;
const sign_controllers_1 = require("./sign.controllers");
const database_1 = require("../../config/database");
const password_utils_1 = require("../utils/password.utils");
const auth_utils_1 = require("../utils/auth.utils");
// TODO: sortir les res.status pour les mettre dans les controllers
const addUser = async (req, res) => {
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
    database_1.db.query(sqlSignUp, (err, rows) => {
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
    const sqlLogin = `SELECT uid, password, admin FROM users WHERE email = "${req.body.email}";`;
    database_1.db.query(sqlLogin, async (err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        else if (rows.length === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            const validPassword = await (0, password_utils_1.checkPassword)(req, rows);
            if (!validPassword) {
                return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            else {
                const token = (0, auth_utils_1.createToken)(rows);
                res.status(200).json({
                    message: "Connexion réussie",
                    uid: rows[0].uid,
                    token: token,
                });
            }
        }
    });
};
exports.logUser = logUser;
//# sourceMappingURL=sign.services.js.map