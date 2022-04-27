"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const database_1 = require("../../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
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
                (0, exports.login)(req, res);
                // res.status(201).json({
                //   message: `Inscription confirmée ! Bienvenue ${req.body.username} !!!`,
                // });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signup = signup;
const checkPassword = (req, docs) => {
    return bcrypt_1.default.compare(req.body.password, docs[0].password);
};
const createToken = (docs) => {
    return jsonwebtoken_1.default.sign({ userId: docs[0].id }, `${process.env.JWT_SECRETKEY}`, {
        expiresIn: "24h",
    });
};
const login = async (req, res) => {
    try {
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
                const validPassword = await checkPassword(req, docs);
                if (!validPassword) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                }
                else {
                    const token = createToken(docs);
                    res.status(200).json({
                        token: token,
                    });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.login = login;
