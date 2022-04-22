"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const database_1 = require("../../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
        const sqlSignIn = `
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
        database_1.db.query(sqlSignIn, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            res.status(201).json({ message: "User added successfully" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};
exports.signUp = signUp;
